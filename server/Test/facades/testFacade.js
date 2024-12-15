const TestDAO = require("../dao/testDAO");

const testFacade = {
  // Recupera i test per un corso
  async getTestsForCourse(courseId) {
    console.log("Sto qui nel facacacacade");
    return await TestDAO.getTestsByCourse(parseInt(courseId, 10)); // Filtra per courseId
  },

  // Calcola il punteggio, assegna i punti e inserisce la ricompensa nella collezione rewards
  async evaluateTest(testId, answers, username) {
    const db = await connect();
    const test = await db.collection("tests").findOne({ _id: testId });

    if (!test) throw new Error("Test non trovato!");

    let score = 0;
    const feedback = [];

    // Calcolo del punteggio basato sulle risposte
    test.questions.forEach((question, index) => {
      const correctAnswer = question.correct;
      if (answers[index] === correctAnswer) {
        score += 10; // Incremento del punteggio per risposta corretta
      } else {
        feedback.push({
          question: question.question,
          userAnswer: answers[index],
          correctAnswer,
        });
      }
    });

    // Calcolo dei punti e del tipo di medaglia in base allo score
    const { points, medal } = this.calculatePoints(score);

    // Verifica se l'utente ha già un premio per questo corso
    const existingReward = await TestDAO.getRewardByUserAndCourse(
      username,
      test.course_id
    );

    if (existingReward) {
      // Confronta la rarità della medaglia
      const medalRarity = { Bronzo: 1, Argento: 2, Oro: 3 };
      if (medalRarity[medal] > medalRarity[existingReward.medal]) {
        // Calcola i punti totali considerando le medaglie precedenti
        const totalPoints = this.calculateTotalPoints(
          medal,
          existingReward.medal
        );
        // Sovrascrivi il premio esistente con il nuovo premio
        await TestDAO.updateReward(existingReward._id, {
          medal,
          points: totalPoints,
          date: new Date(),
        });
      } else {
        // Aggiungi solo i punti dei premi precedenti
        await TestDAO.updateReward(existingReward._id, {
          points: existingReward.points + points,
        });
      }
    } else {
      // Aggiunta dei risultati alla collezione `rewards`
      const reward = {
        user_username: username,
        course_id: test.course_id,
        medal,
        points: this.calculateTotalPoints(medal, null),
        date: new Date(),
      };

      await TestDAO.addReward(reward);
    }

    return { score, feedback, points, medal };
  },

  // Calcolo dei punti e del tipo di medaglia in base allo score
  calculatePoints(score) {
    let points;
    let medal;

    if (score >= 0 && score <= 30) {
      points = 10;
      medal = "Bronzo";
    } else if (score > 30 && score <= 70) {
      points = 20;
      medal = "Argento";
    } else if (score > 70) {
      points = 30;
      medal = "Oro";
    }

    return { points, medal };
  },

  // Calcolo dei punti totali considerando le medaglie precedenti
  calculateTotalPoints(newMedal, existingMedal) {
    const medalPoints = { Bronzo: 10, Argento: 20, Oro: 30 };
    const medalRarity = { Bronzo: 1, Argento: 2, Oro: 3 };
    let totalPoints = 0;

    // Aggiungi i punti delle medaglie inferiori o uguali alla nuova medaglia
    for (const [medal, points] of Object.entries(medalPoints)) {
      if (medalRarity[medal] <= medalRarity[newMedal]) {
        totalPoints += points;
      }
    }

    // Se esiste una medaglia precedente, sottrai i punti delle medaglie inferiori o uguali alla medaglia precedente
    if (existingMedal) {
      for (const [medal, points] of Object.entries(medalPoints)) {
        if (medalRarity[medal] <= medalRarity[existingMedal]) {
          totalPoints -= points;
        }
      }
    }

    return totalPoints;
  },
};

module.exports = testFacade;
