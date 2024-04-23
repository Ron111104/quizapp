import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch('quiz.json')
      .then(res => res.json())
      .then(data => {
        // Shuffle the questions randomly
        const shuffledQuestions = shuffleArray(data);
        // Select the first 10 questions
        const selectedQuestions = shuffledQuestions.slice(0, 10);
        setQuizs(selectedQuestions);
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  }, []);

  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex])

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  }

  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        setMarks(marks + 1);
      }
    }
  }

  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(questionIndex + 1);
  }

  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  }

  const startOver = () => {
    setShowStart(true);
    setShowResult(false);
    setShowQuiz(false);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    fetch('quiz.json')
    .then(res => res.json())
    .then(data => {
      const shuffledQuestions = shuffleArray(data);
      const selectedQuestions = shuffledQuestions.slice(0, 10);
      setQuizs(selectedQuestions);
    })
    .catch(error => console.error('Error fetching quiz data:', error));
  }

  return (
    <DataContext.Provider value={{
      startQuiz, showStart, showQuiz, question, quizs, checkAnswer, correctAnswer,
      selectedAnswer, questionIndex, nextQuestion, showTheResult, showResult, marks,
      startOver
    }} >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
