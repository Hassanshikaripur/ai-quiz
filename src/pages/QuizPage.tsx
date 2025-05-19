import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import QuizCard from '../components/QuizCard';
import Button from '../components/Button';
import { ArrowLeft } from 'lucide-react';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentQuiz, 
    currentQuestion, 
    setCurrentQuestion, 
    userAnswers, 
    answerQuestion, 
    calculateResults 
  } = useQuiz();
  
  const [showExplanation, setShowExplanation] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!currentQuiz) {
      navigate('/');
    }
  }, [currentQuiz, navigate]);

  if (!currentQuiz) {
    return null;
  }

  const question = currentQuiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === currentQuiz.questions.length - 1;

  const handleSelectAnswer = (answerIndex: number) => {
    answerQuestion(currentQuestion, answerIndex);
    setShowExplanation(true);
  };

  const handleNext = () => {
    // First set animating flag to trigger exit animation
    setAnimating(true);
    
    setTimeout(() => {
      // Reset the explanation state before moving to the next question
      setShowExplanation(false);
      
      if (isLastQuestion) {
        calculateResults();
        navigate('/results');
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
      
      // Reset animating flag after the transition
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
      
      <div className={`transition-opacity duration-300 ease-in-out ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <QuizCard
          question={question}
          questionNumber={currentQuestion}
          totalQuestions={currentQuiz.questions.length}
          selectedAnswer={userAnswers[currentQuestion]}
          onSelectAnswer={handleSelectAnswer}
          onNext={handleNext}
          isLast={isLastQuestion}
          showExplanation={showExplanation}
        />
      </div>
    </div>
  );
};

export default QuizPage;