import { useState, useEffect } from 'react';
import './App.css';
import questions from './utils/questions.jsx'
import CardAnimation from './CardAnimation.jsx';
import TextCard from './TextCard.jsx';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [usedIndices, setUsedIndices] = useState([]);
  const [allQuestionsUsed, setAllQuestionsUsed] = useState(false);

  useEffect(() => {
    const storedUsedQuestions = JSON.parse(localStorage.getItem('usedQuestions')) || [];
    setUsedIndices(storedUsedQuestions);

    if (storedUsedQuestions.length === questions.length) {
      setAllQuestionsUsed(true);
    }
  }, []);

  const getRandomQuestion = () => {
    const availableIndices = questions
      .map((_, index) => index)
      .filter(index => !usedIndices.includes(index));

    
    if (availableIndices.length === 0) {
      setAllQuestionsUsed(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const selectedQuestion = availableIndices[randomIndex];

    setCurrentQuestion(questions[selectedQuestion]);
    const updatedUsedQuestions = [...usedIndices, selectedQuestion];
    setUsedIndices(updatedUsedQuestions);
    localStorage.setItem('usedQuestions', JSON.stringify(updatedUsedQuestions));
  };

  const resetQuestions = () => {
    localStorage.removeItem('usedQuestions');
    setUsedIndices([]);
    setCurrentQuestion('');
    setAllQuestionsUsed(false);
  };

  const [showCard, setShowCard] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const handleDisappear = () => {
    setShowCard(false);
    setShowAnimation(true);
    setIsFirstTime(false);

    if(allQuestionsUsed){
      resetQuestions()
    }else{
      getRandomQuestion()
    }

    setTimeout(() => {
      setShowAnimation(false);
      setShowCard(true);
    }, 3000);
  };


  return (
    <div className="App">
      {showCard && 
        <TextCard 
          onDisappear={handleDisappear} 
          isReappearing={true} 
          isFirstTime={isFirstTime} 
          allQuestionsUsed={allQuestionsUsed} 
          currentQuestion={currentQuestion} 
          resetQuestions={resetQuestions} 
          getRandomQuestion={getRandomQuestion} 
        />
      }
      {showAnimation && <CardAnimation />}
      
    </div>
  );
}

export default App;