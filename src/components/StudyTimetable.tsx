import React, { useState } from 'react';
import { generateStudyTimetable } from '../services/geminiService';
import Button from './Button';
import { Calendar, Clock, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface StudyTimetableProps {
  topics: string[];
  performance: {
    topic: string;
    score: number;
  }[];
}

const StudyTimetable: React.FC<StudyTimetableProps> = ({ topics, performance }) => {
  const [timetable, setTimetable] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGenerateTimetable = async () => {
    try {
      setIsLoading(true);
      setError('');
      const studyTimetable = await generateStudyTimetable(topics, performance);
      setTimetable(studyTimetable);
    } catch (err) {
      setError('Failed to generate timetable. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Personalized Study Timetable
        </h2>
        <Button
          onClick={handleGenerateTimetable}
          disabled={isLoading}
          variant="primary"
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 mr-2" />
              Generate Timetable
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="text-red-600 mb-4">{error}</div>
      )}

      {timetable && (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{timetable}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default StudyTimetable;