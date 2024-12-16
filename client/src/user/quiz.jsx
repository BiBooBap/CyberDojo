import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizFacade from '../services/quizFacade';

const QuizPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [feedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testsData = await quizFacade.getTestsForCourse(courseId);

        if (testsData.length === 0) {
          setError("Nessun quiz trovato per questo corso.");
        } else {
          setTests(testsData);
          setCurrentTestIndex(0);
          setCurrentQuestionIndex(0);
        }
      } catch (error) {
        console.error('Errore nel recupero dei test:', error);
        setError("Errore nel recupero dei test.");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [courseId]);

  const handleAnswerChange = (questionId, answerIndex) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      const currentTest = tests[currentTestIndex];
      const selectedAnswers = userAnswers;

      const result = await quizFacade.evaluateTest(currentTest._id, selectedAnswers);
      setScore(result.score);
      setShowResultPopup(true);
    } catch (error) {
      console.error('Errore nella valutazione del test:', error);
      setError("Errore nella valutazione del test.");
    }
  };

  if (loading) {
    return <div className="text-center">Caricamento del quiz...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (tests.length === 0) {
    return <div className="text-center">Nessun quiz disponibile per questo corso.</div>;
  }

  const currentTest = tests[currentTestIndex];
  const questions = currentTest.questions;
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div className="text-center">Domanda non trovata.</div>;
  }

  return (
    <div className="quiz-container mx-auto p-4 max-w-2xl">
      <h1 className="text-black text-center text-2xl font-bold mb-4">
        {currentTest.title}
      </h1>
      
      {/* Indicatori delle Domande */}
      <div className="flex justify-center mb-4">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full mr-1 ${
              index === currentQuestionIndex ? 'bg-[#F0C674]' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>

      {/* Sezione della Domanda Corrente */}
      <div className="question-section mb-6">
        <h3 className="text-black text-center font-semibold mb-4">
          {currentQuestion.question}
        </h3>
        {currentQuestion.answers.map((answer, aIndex) => (
          <button
            key={aIndex}
            onClick={() => handleAnswerChange(currentQuestionIndex, aIndex)}
            className={`block w-full text-left px-4 py-2 mb-2 rounded 
              ${userAnswers[currentQuestionIndex] === aIndex ? 'bg-[#F0C674]' : 'bg-gray-200'}
              hover:bg-[#F0C674] transition-colors`}
          >
            {answer}
          </button>
        ))}
      </div>

      {/* Navigazione tra le Domande */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded ${
            currentQuestionIndex === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          } transition-colors`}
        >
          Precedente
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={userAnswers[currentQuestionIndex] === undefined}
            className={`px-4 py-2 rounded ${
              userAnswers[currentQuestionIndex] === undefined
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } transition-colors`}
          >
            Successiva
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={userAnswers[currentQuestionIndex] === undefined}
            className={`px-4 py-2 rounded ${
              userAnswers[currentQuestionIndex] === undefined
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            } transition-colors`}
          >
            Invia
          </button>
        )}
      </div>

      {/* Sezione dei Risultati */}
      {showResultPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 relative">
            {/* Pulsante X per chiudere il popup */}
            <button
              onClick={() => setShowResultPopup(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
              aria-label="Chiudi"
            >
              &times;
            </button>
            <h2 className="text-black text-center text-xl font-semibold">
              Risultato: {score}
            </h2>
            <p className="text-center">{feedback}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Torna alla Home
              </button>
            </div>
          </div>
        </div>
      )}

      {score !== null && (
        <div className="result-section mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-black text-center text-xl font-semibold">
            Risultato: {score}
          </h2>
          <p className="text-center">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;