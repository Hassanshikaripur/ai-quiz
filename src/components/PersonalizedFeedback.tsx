import React, { useState } from 'react';
import { generatePersonalizedFeedback } from '../services/geminiService';
import Button from './Button';
import { Brain, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { QuizResult } from '../types/quiz';

interface PersonalizedFeedbackProps {
  result: QuizResult;
}

const PersonalizedFeedback: React.FC<PersonalizedFeedbackProps> = ({ result }) => {
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGenerateFeedback = async () => {
    try {
      setIsLoading(true);
      setError('');
      const personalizedFeedback = await generatePersonalizedFeedback(
        result.topic,
        result.questions,
        result.answers,
        result.questions.map(q => q.correctAnswer)
      );
      setFeedback(personalizedFeedback);
    } catch (err) {
      setError('Failed to generate feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Personalized Feedback
        </h2>
        <Button
          onClick={handleGenerateFeedback}
          disabled={isLoading}
          variant="primary"
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Get Feedback'
          )}
        </Button>
      </div>

      {error && (
        <div className="text-red-600 mb-4">{error}</div>
      )}

      {feedback && (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{feedback}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default PersonalizedFeedback