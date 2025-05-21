import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { QuizResult } from '../types/quiz';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceAnalyticsProps {
  history: QuizResult[];
}

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ history }) => {
  const chartData = {
    labels: history.map(result => format(new Date(result.date), 'MMM d, HH:mm')),
    datasets: [
      {
        label: 'Quiz Scores',
        data: history.map(result => (result.score / result.questions.length) * 100),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score (%)'
        }
      }
    }
  };

  const calculateStats = () => {
    const scores = history.map(result => (result.score / result.questions.length) * 100);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    const best = Math.max(...scores);
    const worst = Math.min(...scores);
    
    return { average, best, worst };
  };

  const { average, best, worst } = calculateStats();

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">Performance Analytics</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Average Score</p>
          <p className="text-2xl font-bold">{average.toFixed(1)}%</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600">Best Score</p>
          <p className="text-2xl font-bold">{best.toFixed(1)}%</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600">Lowest Score</p>
          <p className="text-2xl font-bold">{worst.toFixed(1)}%</p>
        </div>
      </div>

      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PerformanceAnalytics