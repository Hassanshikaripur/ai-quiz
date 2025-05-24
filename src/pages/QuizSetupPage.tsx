import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Button from '../components/Button';
import DifficultySelector from '../components/DifficultySelector';
import { ArrowLeft } from 'lucide-react';

const QuizSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { generateQuiz, isLoading } = useQuiz();
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      setInputError('Please enter a topic or text to generate a quiz');
      return;
    }
    
    setInputError('');
    try {
      await generateQuiz(inputText.trim());
      navigate('/quiz');
    } catch (error) {
      setInputError('Failed to generate quiz. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-gray-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Create Your Quiz</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                Enter a topic or paste text
              </label>
              <textarea
                id="topic"
                rows={4}
                placeholder="e.g., 'The history of Ancient Egypt' or paste a paragraph about any subject..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              {inputError && (
                <p className="mt-2 text-sm text-red-600">{inputError}</p>
              )}
            </div>

            <DifficultySelector />
            
            <Button 
              type="submit" 
              fullWidth 
              isLoading={isLoading}
              size="lg"
            >
              Generate Quiz
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizSetupPage;