import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import ResultCard from '../components/ResultCard';
import QuizCard from '../components/QuizCard';
import ShareResults from '../components/ShareResults';
import PersonalizedFeedback from '../components/PersonalizedFeedback';
import PerformanceAnalytics from '../components/PerformanceAnalytics';
import StudyTimetable from '../components/StudyTimetable';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { quizResult, resetQuiz, userAnswers, setCurrentQuestion, quizHistory } = useQuiz();
  const [viewingQuestion, setViewingQuestion] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!quizResult) {
      navigate('/');
    }
  }, [quizResult, navigate]);

  if (!quizResult) {
    return null;
  }

  const handleReset = () => {
    resetQuiz();
    navigate('/');
  };

  const handleViewQuestions = (index: number) => {
    setViewingQuestion(index);
  };

  const handleBackToResults = () => {
    setViewingQuestion(null);
  };

  const handleNextQuestion = () => {
    if (viewingQuestion !== null && viewingQuestion < quizResult.questions.length - 1) {
      setViewingQuestion(viewingQuestion + 1);
    } else {
      setViewingQuestion(null);
    }
  };

  // Prepare data for study timetable
  const topics = quizHistory.map(result => result.topic);
  const performance = quizHistory.map(result => ({
    topic: result.topic,
    score: (result.score / result.questions.length) * 100
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4">
      {viewingQuestion !== null ? (
        <div className="max-w-5xl mx-auto animate-fade-in">
          <button
            onClick={handleBackToResults}
            className="mb-6 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            ← Back to Results
          </button>
          <QuizCard
            question={quizResult.questions[viewingQuestion]}
            questionNumber={viewingQuestion}
            totalQuestions={quizResult.questions.length}
            selectedAnswer={quizResult.answers[viewingQuestion]}
            onSelectAnswer={() => {}}
            onNext={handleNextQuestion}
            isLast={viewingQuestion === quizResult.questions.length - 1}
            showExplanation={true}
          />
        </div>
      ) : (
        <div className="animate-fade-in max-w-5xl mx-auto">
          <ResultCard
            result={quizResult}
            onReset={handleReset}
            onViewQuestions={handleViewQuestions}
          />
          
          <ShareResults
            score={quizResult.score}
            total={quizResult.questions.length}
            topic={quizResult.topic}
          />
          
          <PersonalizedFeedback result={quizResult} />
          
          {quizHistory.length > 0 && (
            <>
              <PerformanceAnalytics history={quizHistory} />
              <StudyTimetable topics={topics} performance={performance} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;