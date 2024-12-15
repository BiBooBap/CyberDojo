
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import quizFacade from '../services/quizFacade';

/*
const QuizPage = () => {
  const { courseId } = useParams();
  const [tests, setTests] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testsData = await quizFacade.getTestsForCourse(courseId);
        console.log("TESTDATA", testsData);
        setTests(testsData);
      } catch (error) {
        console.error('Errore nel recupero dei test:', error);
      }
    };

    fetchTests();
  }, [courseId]);

  const handleAnswerChange = (questionName, answer) => {
    setUserAnswers((prev) => ({ ...prev, [questionName]: answer }));
  };

  const handleSubmit = async () => {
    try {
      const currentTest = tests[currentTestIndex];
      const result = await quizFacade.evaluateTest(currentTest.id, userAnswers);
      setScore(result.score);
      setFeedback(result.feedback);
    } catch (error) {
      console.error('Errore nella valutazione del test:', error);
    }
  };

  if (tests.length === 0) {
    return <div>Loading Quiz...</div>;
  }

  const currentTest = tests[currentTestIndex];

  return (
    <div className="quiz-container">
      <h1>{currentTest.title}</h1>
      {currentTest.questions.map((question, qIndex) => (
        <div key={qIndex} className="question-section">
          <h3>{question.question}</h3>
          {question.answers.map((answer, aIndex) => (
            <label key={aIndex}>
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={answer}
                checked={userAnswers[question.question] === answer}
                onChange={() => handleAnswerChange(question.name, answer)}
              />
              {answer}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
      {score !== null && (
        <div className="result-section">
          <h2>Risultato: {score}</h2>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
*/



const QuizPage = () => {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizzes = await quizFacade.getTestsForCourse(courseId);
        console.log('Dati quiz ricevuti:', quizzes);
        if (quizzes.length > 0) {
          setQuestions(quizzes[0].questions);
          console.log('Domande impostate:', quizzes[0].questions);
        } else {
          setError("Nessun quiz trovato per questo corso.");
        }
      } catch (err) {
        setError("Errore durante il caricamento del quiz.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [courseId]);

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (loading) {
    return <div>Caricamento del quiz...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!questions || questions.length === 0) {
    return <div>Nessuna domanda disponibile.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Domanda non trovata.</div>;
  }

  const handleAnswerChange = (index, questionName, answer) => {
    userAnswers[index] = answer;
    
  };

  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
        {questions.map((_, index) => (
          <div
            key={index}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: index === currentQuestionIndex ? '#F0C674' : '#EAEAEA',
              borderRadius: '50%',
            }}
          ></div>
        ))}
      </div>
      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        {currentQuestionIndex > 0 && (
          <div style={{ backgroundColor: '#54295c', color: 'white', padding: '10px', borderRadius: '10px', width: '200px', position: 'absolute', left: 'calc(50% - 210px)', zIndex: 5, opacity: 0.5 }}>
            <h2 style={{ fontSize: '14px', textAlign: 'center' }}>{questions[currentQuestionIndex - 1].text}</h2>
            <div style={{ backgroundColor: '#EAE6FA', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
              {questions[currentQuestionIndex - 1].answers.map((answer, index) => (
                <button 
                  key={index} 
                  style={{ display: 'block', margin: '10px auto', padding: '10px 20px', backgroundColor: '#EAE6FA', border: '1px solid #000', borderRadius: '5px', width: '100%', color: 'black' }}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{ backgroundColor: '#54295c', color: 'white', padding: '10px', borderRadius: '10px', width: '200px', zIndex: 10 }}>
          <h2 style={{ fontSize: '14px', textAlign: 'center' }}>{questions[currentQuestionIndex].text}</h2>
          <div style={{ backgroundColor: '#EAE6FA', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
          <h1 className="text-black text-center">
        {questions[currentQuestionIndex].question}
          </h1>
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button 
                key={index} 
                style={{ display: 'block', margin: '10px auto', padding: '10px 20px', backgroundColor: '#EAE6FA', border: '1px solid #000', borderRadius: '5px', width: '100%', color: 'black' }}
                onClick={(event) => handleAnswerChange(currentQuestionIndex, questions[currentQuestionIndex].name, answer)}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
        {currentQuestionIndex < questions.length - 1 && (
          <div style={{ backgroundColor: '#54295c', color: 'white', padding: '10px', borderRadius: '10px', width: '200px', position: 'absolute', right: 'calc(50% - 210px)', zIndex: 5, opacity: 0.5 }}>
            <h2 style={{ fontSize: '14px', textAlign: 'center' }}>{questions[currentQuestionIndex + 1].text}</h2>
            <div style={{ backgroundColor: '#EAE6FA', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
              {questions[currentQuestionIndex + 1].answers.map((answer, index) => (
                <button 
                  key={index} 
                  style={{ display: 'block', margin: '10px auto', padding: '10px 20px', backgroundColor: '#EAE6FA', border: '1px solid #000', borderRadius: '5px', width: '100%', color: 'black' }}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
          <button 
            onClick={handlePrev} 
            disabled={currentQuestionIndex === 0} 
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
          >
            ←
          </button>
          <div style={{ flexGrow: 1, textAlign: 'center', padding: '0 20px' }}>
            
            </div>
            <button 
              onClick={handleNext} 
              disabled={currentQuestionIndex === questions.length - 1} 
              style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default QuizPage;