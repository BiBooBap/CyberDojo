const TestDAO = require("../dao/testDAO");

class TestService {
    // Retrieve tests for a course
    static async getTestsForCourse(courseId) {
        return await TestDAO.getTestsByCourse(courseId); // Filter by courseId
    }

    // Calculate the score, assign points, and insert the reward into the rewards collection
    static async evaluateTest(testId, answers, username) {
    const test = await TestDAO.getTestById(parseInt(testId, 10));

    if (!test) throw new Error("Test non trovato!");

    let score = 0;
    const feedback = [];

    // Calculate the score based on the answers
    test.questions.forEach((question, index) => {
        const correctAnswer = question.correct;
        if (answers[index] === correctAnswer) {
            score += 10; // Increment score for correct answer
        } else {
            feedback.push({
                question: question.question,
                userAnswer: answers[index],
                correctAnswer,
            });
        }
    });

    // Calculate points and medal type based on the score
    const { points, medal } = await this.calculatePoints(score);

    // Check if the user already has a reward for this course
    const existingReward = await TestDAO.getRewardByUserAndCourse(
        username,
        parseInt(test.course_id, 10),
    );

    if (existingReward) {
    // Compare the rarity of the medal
    const medalRarity = { Bronzo: 1, Argento: 2, Oro: 3 };
    if (medalRarity[medal] > medalRarity[existingReward.medal]) {
        // Calculate the total points considering the previous medals
        const totalPoints = await this.calculateTotalPoints(
            medal,
            existingReward.medal
        );

        // Overwrite the existing reward with the new reward
        await TestDAO.updateReward(existingReward._id, {
            medal,
            points: totalPoints,
            date: new Date(),
        });
        await TestDAO.addPoints(username, totalPoints);

    } else {
        // Add only the points from the previous rewards
        const ps =  existingReward.points + points;
        await TestDAO.updateReward(existingReward._id, {
            points: ps,
        });
            await TestDAO.addPoints(username, ps);
        }
    } else {
        const pts = await this.calculateTotalPoints(medal, null);
        // Adding results to the `rewards` collection
        const reward = {
            _id: null,
            user_username: username,
            course_id: parseInt(test.course_id, 10),
            medal,
            points: pts,
            date: new Date(),
        };
        await TestDAO.addReward(reward);
        await TestDAO.addPoints(username, pts);
    }

        return { score, feedback };
    }

    // Calculate points and medal type based on the score
    static async calculatePoints(score) {
        let points;
        let medal;
        if (score >= 0 && score <= 30) {
            points = 10;
            medal = "Bronze";
        } else if (score > 30 && score <= 70) {
            points = 20;
            medal = "Silver";
        } else if (score > 70) {
            points = 30;
            medal = "Gold";
        }

        return { points, medal };
    }

    // Calculate the total points considering the previous medals
    static async calculateTotalPoints(newMedal, existingMedal) {
        const medalPoints = { Bronze: 10, Silver: 20, Gold: 30 };
        const medalRarity = { Bronze: 1, Silver: 2, Gold: 3 };
        let totalPoints = 0;

    // Add points for medals less than or equal to the new medal
    for (const [medal, points] of Object.entries(medalPoints)) {
        if (medalRarity[medal] <= medalRarity[newMedal]) {
            totalPoints += points;
        }
    }

    // If there is an existing medal, subtract the points of medals less than or equal to the existing medal
    if (existingMedal) {
        for (const [medal, points] of Object.entries(medalPoints)) {
            if (medalRarity[medal] <= medalRarity[existingMedal]) {
                totalPoints -= points;
            }
        }
    }
    return totalPoints;
    }
}

module.exports = TestService;