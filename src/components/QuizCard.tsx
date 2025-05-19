import React from 'react';
import { QuizQuestion } from '../types/quiz';
import Button from './Button';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number;
  onSelectAnswer: (answerIndex: number) => void;
  onNext: () => void;
  isLast: boolean;
  showExplanation: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  isLast,
  showExplanation,
}) => {
  const letterOptions = ['A', 'B', 'C', 'D'];
  const hasAnswered = selectedAnswer !== -1;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium text-gray-500">
            Question {questionNumber + 1}/{totalQuestions}
          </div>
          <div className="h-2 flex-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${((questionNumber + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !hasAnswered && onSelectAnswer(index)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                selectedAnswer === index
                  ? showExplanation
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                  selectedAnswer === index 
                    ? showExplanation
                      ? index === question.correctAnswer
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {letterOptions[index]}
                </span>
                <span className="text-gray-800">{option}</span>
                {showExplanation && selectedAnswer === index && (
                  <span className="ml-auto">
                    {index === question.correctAnswer ? 
                      <CheckCircle className="w-5 h-5 text-green-600" /> : 
                      <XCircle className="w-5 h-5 text-red-600" />
                    }
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
        
        {showExplanation && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-1">Explanation:</h3>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}
        
        <div className="mt-8 flex justify-end">
          <Button
            disabled={!hasAnswered}
            variant="primary"
            onClick={onNext}
          >
            {isLast ? 'Show Results' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;