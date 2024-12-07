import React, { useState } from 'react';

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      text: 'Qual è la capitale della Francia?',
      answers: ['Parigi', 'Londra', 'Roma', 'Berlino'],
    },
    {
      text: 'Qual è la capitale dell\'Italia?',
      answers: ['Parigi', 'Londra', 'Roma', 'Berlino'],
    },
    {
      text: 'Qual è la capitale della Germania?',
      answers: ['Parigi', 'Londra', 'Roma', 'Berlino'],
    },
    {
        text: 'Prova4',
        answers: ['Prova', 'Prova', 'Prova', 'Prova'],
      },
  ];

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
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button 
                key={index} 
                style={{ display: 'block', margin: '10px auto', padding: '10px 20px', backgroundColor: '#EAE6FA', border: '1px solid #000', borderRadius: '5px', width: '100%', color: 'black' }}
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
            {/* Rimosso il div delle risposte sotto */}
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

export default QuizApp;