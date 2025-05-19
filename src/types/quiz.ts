export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation?: string;
}

export interface QuizData {
  topic: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  score: number; // Out of 10
  answers: number[]; // Array of selected answer indexes
  questions: QuizQuestion[];
}

export interface QuizContextType {
  topic: string;
  setTopic: (topic: string) => void;
  isLoading: boolean;
  currentQuiz: QuizData | null;
  currentQuestion: number;
  userAnswers: number[];
  quizResult: QuizResult | null;
  setCurrentQuiz: (quiz: QuizData) => void;
  setCurrentQuestion: (questionIndex: number) => void;
  answerQuestion: (questionIndex: number, answerIndex: number) => void;
  generateQuiz: (topic: string) => Promise<void>;
  calculateResults: () => void;
  resetQuiz: () => void;
}