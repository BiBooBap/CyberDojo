const TestDAO = require("./testDAO");

class TestFacade {
  // Crea un nuovo test per un corso specifico
  async createTest(courseId, questions) {
    const test = {
      course_id: courseId,
      questions,
    };
    return await TestDAO.createTest(test);
  }

  // Recupera i test per un corso
  async getTestsForCourse(courseId) {
    return await TestDAO.getTestsByCourse(courseId);  // Filtra per courseId
  }

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

    // Calcolo dei punti in base allo score
    const points = this.calculatePoints(score);

    // Aggiunta dei risultati alla collezione `rewards`
    const reward = {
      user_username: username,
      course_id: test.course_id,
      description: "Completato con successo", // Descrizione del premio - dovrebbe essere un oggetto
      points,
      date: new Date(),
    };

    await TestDAO.addReward(reward);

    return { score, feedback, points };
  }

  // Calcolo dei punti in base allo score
  calculatePoints(score) {
    if (score >= 0 && score <= 30) return 10;
    if (score > 30 && score <= 60) return 20;
    if (score > 60 && score <= 90) return 30;
    return 40; // Per score superiori a 90
  }
}

module.exports = new TestFacade();

