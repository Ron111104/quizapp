import React, { useContext } from 'react';
import DataContext from '../context/dataContext';
import './Start.css';
import { Link } from 'react-router-dom';

const Start = () => {
  const { startQuiz, showStart } = useContext(DataContext);

  return (
    <section className="start-section" style={{ display: `${showStart ? 'block' : 'none'}` }}>
      <div className="start-container">
        <div className="start-content">
          <h1>Basic React JS Quiz</h1>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>
    </section>
  );
};

export default Start;
