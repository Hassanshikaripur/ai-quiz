import React, { createContext, useState, useContext, ReactNode } from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const generateQuiz = async (newTopic: string) => {
    try {
      setIsLoading(true);
      setTopic(newTopic);
      
      // Generate quiz questions using Gemini AI
      const quizData = await generateQuizQuestions(newTopic);
      
      setCurrentQuiz(quizData);
      setCurrentQuestion(0);
      setUserAnswers(Array(quizData.questions.length).fill(-1));
      setQuizResult(null);
    } catch (error) {
      console.error('Error generating quiz:', error);
      // Handle error appropriately
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
      score,
      answers: userAnswers,
      questions: currentQuiz.questions,
    };

    setQuizResult(result);
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
    isLoading,
    currentQuiz,
    currentQuestion,
    userAnswers,
    quizResult,
    setCurrentQuiz,
    setCurrentQuestion,
    answerQuestion,
    generateQuiz,
    calculateResults,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};