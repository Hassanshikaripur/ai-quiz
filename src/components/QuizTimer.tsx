import React from 'react';
import { useTimer } from 'react-timer-hook';

interface QuizTimerProps {
  expiryTimestamp: Date;
  onExpire: () => void;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ expiryTimestamp, onExpire }) => {
  const { seconds, minutes, isRunning } = useTimer({
    expiryTimestamp,
    onExpire,
    autoStart: true
  });

  return (
    <div className="flex items-center gap-2 text-gray-600">
      <div className="w-20 text-center py-1 px-2 bg-gray-100 rounded-md">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      {isRunning && (
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      )}
    </div>
  );
};

export default QuizTimer;