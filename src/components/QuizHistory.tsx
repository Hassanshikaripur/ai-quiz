import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { formatDistanceToNow } from 'date-fns';
import Button from './Button';
import { History, Trash2 } from 'lucide-react';

const QuizHistory: React.FC = () => {
  const { quizHistory, clearHistory } = useQuiz();

  if (quizHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <History className="w-5 h-5" />
          Quiz History
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={clearHistory}
          className="text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear History
        </Button>
      </div>
      
      <div className="space-y-4">
        {quizHistory.map((result) => (
          <div
            key={result.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{result.topic}</h3>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(result.date))} ago
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {result.score}/{result.questions.length}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {result.difficulty}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizHistory;