import React from 'react';
import { QuizResult } from '../types/quiz';
import Button from './Button';
import { CheckCircle, XCircle, ArrowLeft, LucideLoader2 } from 'lucide-react';

interface ResultCardProps {
  result: QuizResult;
  onReset: () => void;
  onViewQuestions: (index: number) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset, onViewQuestions }) => {
  const { score, questions, answers } = result;
  const percentage = (score / questions.length) * 100;
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return 'Excellent!';
    if (percentage >= 80) return 'Great job!';
    if (percentage >= 70) return 'Good work!';
    if (percentage >= 60) return 'Not bad!';
    if (percentage >= 40) return 'Keep practicing!';
    return 'Room for improvement!';
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Results</h2>
          <div className="mb-4">
            <div className="text-5xl font-bold mb-2 transition-all duration-700 ease-out">
              <span className={getScoreColor()}>
                {score}/{questions.length}
              </span>
            </div>
            <p className="text-xl text-gray-600">{getScoreMessage()}</p>
          </div>
          
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-4">
            <div 
              className={`h-full ${percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-amber-500' : 'bg-red-500'} transition-all duration-1000 ease-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Summary</h3>
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border flex items-center justify-between transition-all duration-200 
                  ${answers[index] === question.correctAnswer 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'}`}
              >
                <div className="flex items-center">
                  {answers[index] === question.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                  )}
                  <span className="text-gray-800 line-clamp-1">{question.question}</span>
                </div>
                <button 
                  onClick={() => onViewQuestions(index)}
                  className="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onReset}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;