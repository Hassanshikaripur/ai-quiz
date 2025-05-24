import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateStudyTimetable } from '../services/geminiService';
import Button from '../components/Button';
import { ArrowLeft, Calendar, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const TimetablePage: React.FC = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState('');
  const [timetable, setTimetable] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topics.trim()) {
      setError('Please enter at least one topic');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const topicsList = topics.split(',').map(t => t.trim());
      const performance = topicsList.map(topic => ({ topic, score: 0 }));
      const result = await generateStudyTimetable(topicsList, performance);
      setTimetable(result);
    } catch (err) {
      setError('Failed to generate timetable. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-gray-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold">Create Study Timetable</h1>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-6">
              <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your study topics (separated by commas)
              </label>
              <textarea
                id="topics"
                rows={4}
                placeholder="e.g., Mathematics, Physics, History, Computer Science"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <Button 
              type="submit" 
              fullWidth 
              isLoading={isLoading}
              variant="secondary"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Generating Timetable...
                </>
              ) : (
                'Generate Study Timetable'
              )}
            </Button>
          </form>
        </div>

        {timetable && (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Your Personalized Study Schedule</h2>
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{timetable}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetablePage;