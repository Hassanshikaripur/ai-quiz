import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { Brain, Lightbulb, Zap } from 'lucide-react';

const DifficultySelector: React.FC = () => {
  const { difficulty, setDifficulty } = useQuiz();

  const difficulties = [
    { value: 'easy', label: 'Easy', icon: Lightbulb, color: 'text-green-500' },
    { value: 'medium', label: 'Medium', icon: Brain, color: 'text-blue-500' },
    { value: 'hard', label: 'Hard', icon: Zap, color: 'text-red-500' }
  ] as const;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {difficulties.map(({ value, label, icon: Icon, color }) => (
        <button
          key={value}
          onClick={() => setDifficulty(value)}
          className={`flex-1 p-4 rounded-lg border-2 transition-all ${
            difficulty === value
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 hover:border-primary-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Icon className={`w-5 h-5 ${color}`} />
            <span className="font-medium">{label}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;