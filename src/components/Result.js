import React, { useContext } from 'react';
import DataContext from '../context/dataContext';
import './Result.css';

const Result = () => {
  const { showResult, quizs, marks, startOver } = useContext(DataContext);

  return (
    <section className="result-section" style={{ display: `${showResult ? 'block' : 'none'}` }}>
      <div className="result-container">
        <div className={`result-content ${marks > (quizs.length * 5 / 2) ? 'pass' : 'fail'}`}>
          <h1>{marks > (quizs.length/ 2) ? 'Awesome!' : 'Oops!'}</h1>
          <h3>Your score is {marks} out of {quizs.length}</h3>
          <button onClick={startOver}>Start Over</button>
        </div>
      </div>
    </section>
  );
};

export default Result;
