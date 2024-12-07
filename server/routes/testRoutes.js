const express = require("express");
const TestFacade = require("../Test/facades/testFacade");

const router = express.Router();

/**
 * Crea un nuovo test per un corso specifico e utente.
 * Body richiesto:
 * {
 *   "courseId": 1,
 *   "username": "giulia123",
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
  const { courseId, username, questions } = req.body;
  try {
    const testId = await TestFacade.createTest(courseId, username, questions);
    res.status(201).json({ message: "Test creato con successo", testId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Recupera tutti i test completati da un utente specifico.
 * Parametro richiesto: username (nella URL).
 * Esempio di chiamata: GET /tests/user/giulia123
 */
router.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const tests = await TestFacade.getTestsForUser(username);
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Valuta un test per un utente.
 * Parametri richiesti:
 * - testId (nella URL)
 * - Body:
 * {
 *   "answers": [0, 1, 2] // Indici delle risposte fornite dall'utente
 * }
 * Esempio di chiamata: POST /tests/evaluate/6384a2f0f0d2f
 */
router.post("/evaluate/:testId", async (req, res) => {
  const { testId } = req.params;
  const { answers } = req.body;
  try {
    const result = await TestFacade.evaluateTest(testId, answers);
    res.status(200).json({
      message: "Test valutato con successo",
      score: result.score,
      feedback: result.feedback,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
