import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { QuizContextType, QuizData, QuizResult } from '../types/quiz';
import { generateQuizQuestions } from '../services/geminiService';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [topic, setTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>(() => {
    const saved = localStorage.getItem('quizHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
  }, [quizHistory]);

  const generateQuiz = async (newTopic: string) => {
    try {
      setIsLoading(true);
      setTopic(newTopic);
      
      const quizData = await generateQuizQuestions(newTopic, difficulty);
      
      setCurrentQuiz(quizData);
      setCurrentQuestion(0);
      setUserAnswers(Array(quizData.questions.length).fill(-1));
      setQuizResult(null);
    } catch (error) {
      console.error('Error generating quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const answerQuestion = (questionIndex: number, answerIndex: number) => {
    setUserAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const calculateResults = () => {
    if (!currentQuiz) return;

    let score = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score += 1;
      }
    });

    const result: QuizResult = {
      id: crypto.randomUUID(),
      topic: currentQuiz.topic,
      score,
      answers: userAnswers,
      questions: currentQuiz.questions,
      timeTaken: Date.now(),
      date: new Date().toISOString(),
      difficulty: currentQuiz.difficulty
    };

    setQuizResult(result);
    saveQuizToHistory(result);
  };

  const saveQuizToHistory = (result: QuizResult) => {
    setQuizHistory(prev => [result, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setQuizHistory([]);
    localStorage.removeItem('quizHistory');
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizResult(null);
    setTopic('');
  };

  const value: QuizContextType = {
    topic,
    setTopic,
    difficulty,
    setDifficulty,
    isLoading,
    currentQuiz,
    currentQuestion,
    userAnswers,
    quizResult,
    quizHistory,
    setCurrentQuiz,
    setCurrentQuestion,
    answerQuestion,
    generateQuiz,
    calculateResults,
    resetQuiz,
    saveQuizToHistory,
    clearHistory,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};