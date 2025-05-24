import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import QuizSetupPage from './pages/QuizSetupPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import TimetablePage from './pages/TimetablePage';

function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz-setup" element={<QuizSetupPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </QuizProvider>
    </BrowserRouter>
  );
}

export default App;