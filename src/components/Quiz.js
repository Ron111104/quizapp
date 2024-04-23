import React, { useContext } from 'react';
import DataContext from '../context/dataContext';
import './Quiz.css';

const Quiz = () => {
  const { question, quizs, checkAnswer, correctAnswer, selectedAnswer, questionIndex, nextQuestion, showTheResult, marks ,showQuiz} = useContext(DataContext);

  const handleOptionClick = (option) => {
    if (selectedAnswer !== '') return; // Do not allow clicking if an answer has already been selected

    // Check if the clicked option is correct or wrong
    const isCorrect = option === correctAnswer;
    checkAnswer(isCorrect, option);
  };
  if (showQuiz === false) {
    return ;
  }
  return (
    <section className="quiz-section">
      <div className="score">
        <p>Your current score:</p>
        <h1>{marks}</h1>
      </div>
      <div className="quiz-container">
        <div className="quiz-content">
          <h5>{question?.question}</h5>
          {question?.options?.map((option, index) => (
            <button
              key={index}
              className={`option btn ${selectedAnswer === option ? (option === correctAnswer ? 'correct' : 'wrong') : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
          <button
            onClick={questionIndex + 1 !== quizs.length? nextQuestion : showTheResult}
            disabled={selectedAnswer === ''}
          >
            {questionIndex + 1 !== quizs.length ? 'Next Question' : 'Show Result'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
