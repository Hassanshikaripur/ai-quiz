import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Calendar, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-4 rounded-full">
                <Brain className="h-16 w-16 text-white" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600"
            >
              QuizGenius AI
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Transform your learning experience with AI-powered quizzes and personalized study schedules.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Quiz Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">
                  <Brain className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Take a Quiz</h2>
                  <p className="text-gray-600">Test your knowledge with AI-generated questions on any topic.</p>
                </div>
                <Button 
                  onClick={() => navigate('/quiz-setup')}
                  fullWidth
                  size="lg"
                  className="group"
                >
                  Start Quiz
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Timetable Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">
                  <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Create Schedule</h2>
                  <p className="text-gray-600">Generate an AI-optimized study timetable for better learning.</p>
                </div>
                <Button 
                  onClick={() => navigate('/timetable')}
                  fullWidth
                  size="lg"
                  variant="secondary"
                  className="group"
                >
                  Create Timetable
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;