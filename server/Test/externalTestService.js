const TestDAO = require("./dao/testDAO");

class ExternalTestService {

  // Method to get all tests for a specific course
  static async getTestsByCourse(courseId) {
    return await TestDAO.getTestsByCourse(courseId);
  }

  // Method to evaluate a test and calculate the score
  static async evaluateTest(testId, answers, username) {
    const test = await TestDAO.getTestById(testId);
    if (!test) throw new Error("Test not found!");

    let score = 0;
    const feedback = [];

    test.questions.forEach((question, index) => {
      const correctAnswer = question.correct;
      if (answers[index] === correctAnswer) {
        score += 10;
      } else {
        feedback.push({
          question: question.question,
          userAnswer: answers[index],
          correctAnswer,
        });
      }
    });

    // Calculate points and medal based on score
    const { points, medal } = this.calculatePoints(score);

    // Add reward to user
    const existingReward = await TestDAO.getRewardByUserAndCourse(username, test.course_id);
    if (existingReward) {
      const totalPoints = this.calculateTotalPoints(medal, existingReward.medal);
      await TestDAO.updateReward(existingReward._id, {
        points: existingReward.points + points,
      });
    } else {
      const reward = {
        user_username: username,
        course_id: test.course_id,
        medal,
        points,
        date: new Date(),
      };
      await TestDAO.addReward(reward);
    }

    return { score, feedback, points, medal };
  }

  // Helper method to calculate points and medal based on score
  static calculatePoints(score) {
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

  // Helper method to calculate total points based on new and existing medals
  static calculateTotalPoints(newMedal, existingMedal) {
    const medalPoints = { Bronze: 10, Silver: 20, Gold: 30 };
    const medalRarity = { Bronze: 1, Silver: 2, Gold: 3 };
    let totalPoints = 0;

    // Calculate total points based on new medal
    for (const [medal, points] of Object.entries(medalPoints)) {
      if (medalRarity[medal] <= medalRarity[newMedal]) {
        totalPoints += points;
      }
    }


    // If user already has a medal, subtract the points of the existing medal
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

module.exports = ExternalTestService;