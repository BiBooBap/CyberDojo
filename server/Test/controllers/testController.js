const express = require("express");
const TestFacade = require("../facade/TestFacade");

const router = express.Router();

/**
 * Crea un nuovo test per un corso specifico.
 * Body richiesto:
 * {
 *   "courseId": 1,
 *   "questions": [
 *     {
 *       "question": "Qual è la differenza tra let e var?",
 *       "answers": ["Risposta 1", "Risposta 2", "Risposta 3"],
 *       "correct": 0
 *     }
 *   ]
 * }
 */
router.post("/", async (req, res) => {
  const { courseId, questions } = req.body;
  try {
    const testId = await TestFacade.createTest(courseId, questions);
    res.status(201).json({ message: "Test creato con successo", testId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Recupera tutti i test associati a un corso specifico.
 * Parametro richiesto: courseId (nella URL).
 * Esempio di chiamata: GET /tests/course/1
 */
router.get("/course/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    const tests = await TestFacade.getTestsForCourse(courseId);
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Valuta un test, calcola il punteggio e assegna i punti.
 * Parametri richiesti:
 * - testId (nella URL)
 * - Body:
 * {
 *   "answers": [0, 1, 2], // Indici delle risposte fornite dall'utente
 *   "username": "giulia123" // Username dell'utente
 * }
 * Esempio di chiamata: POST /tests/evaluate/6384a2f0f0d2f
 */
router.post("/evaluate/:testId", async (req, res) => {
  const { testId } = req.params;
  const { answers, username } = req.body;  // Risposte fornite dall'utente e username
  try {
    const result = await TestFacade.evaluateTest(testId, answers, username);
    res.status(200).json({
      message: "Test valutato con successo",
      score: result.score,
      points: result.points,
      feedback: result.feedback,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

