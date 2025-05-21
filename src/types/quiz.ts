export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizData {
  topic: string;
  questions: QuizQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
  timePerQuestion: number;
}

export interface QuizResult {
  id: string;
  topic: string;
  score: number;
  answers: number[];
  questions: QuizQuestion[];
  timeTaken: number;
  date: string;
  difficulty: string;
}

export interface QuizContextType {
  topic: string;
  setTopic: (topic: string) => void;
  difficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  isLoading: boolean;
  currentQuiz: QuizData | null;
  currentQuestion: number;
  userAnswers: number[];
  quizResult: QuizResult | null;
  quizHistory: QuizResult[];
  setCurrentQuiz: (quiz: QuizData) => void;
  setCurrentQuestion: (questionIndex: number) => void;
  answerQuestion: (questionIndex: number, answerIndex: number) => void;
  generateQuiz: (topic: string) => Promise<void>;
  calculateResults: () => void;
  resetQuiz: () => void;
  saveQuizToHistory: (result: QuizResult) => void;
  clearHistory: () => void;
}