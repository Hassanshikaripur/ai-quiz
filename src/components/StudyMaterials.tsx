import React, { useState } from 'react';
import { generateStudyMaterials } from '../services/geminiService';
import Button from './Button';
import { Book, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface StudyMaterialsProps {
  topic: string;
}

const StudyMaterials: React.FC<StudyMaterialsProps> = ({ topic }) => {
  const [materials, setMaterials] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGenerateMaterials = async () => {
    try {
      setIsLoading(true);
      setError('');
      const studyMaterials = await generateStudyMaterials(topic);
      setMaterials(studyMaterials);
    } catch (err) {
      setError('Failed to generate study materials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Book className="w-5 h-5" />
          Study Materials
        </h2>
        <Button
          onClick={handleGenerateMaterials}
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
            'Generate Study Guide'
          )}
        </Button>
      </div>

      {error && (
        <div className="text-red-600 mb-4">{error}</div>
      )}

      {materials && (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{materials}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default StudyMaterials