import React, { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import Button from '../components/Button';
import DifficultySelector from '../components/DifficultySelector';
import QuizHistory from '../components/QuizHistory';
import StudyMaterials from '../components/StudyMaterials';
import { Brain, GraduationCap, Sparkles, Target, Book, Award, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { generateQuiz, isLoading } = useQuiz();
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animation').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      setInputError('Please enter a topic or text to generate a quiz');
      return;
    }
    
    setInputError('');
    try {
      await generateQuiz(inputText.trim());
      navigate('/quiz');
    } catch (error) {
      setInputError('Failed to generate quiz. Please try again.');
    }
  };

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
              Transform any topic into an engaging quiz instantly with AI. Perfect for students, teachers, and curious minds.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="card p-6 md:p-8 mb-12"
            >
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter a topic or paste text
                  </label>
                  <textarea
                    id="topic"
                    rows={4}
                    placeholder="e.g., 'The history of Ancient Egypt' or paste a paragraph about any subject..."
                    className="input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  {inputError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{inputError}</p>
                  )}
                </div>

                <DifficultySelector />
                
                <Button 
                  type="submit" 
                  fullWidth 
                  isLoading={isLoading}
                  className="h-12 text-lg"
                >
                  {isLoading ? (
                    'Generating Quiz...'
                  ) : (
                    <>
                      Start Quiz <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {inputText && <StudyMaterials topic={inputText} />}
            <QuizHistory />
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 scroll-animation">
            Why Choose QuizGenius?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Sparkles className="h-8 w-8 text-primary-600" />,
                title: 'AI-Powered Intelligence',
                description: 'Leverages Google Gemini 2.0 Flash to generate intelligent, contextually relevant questions.'
              },
              {
                icon: <Target className="h-8 w-8 text-purple-600" />,
                title: 'Instant Customization',
                description: 'Create quizzes on any topic instantly. Perfect for quick learning assessments.'
              },
              {
                icon: <Book className="h-8 w-8 text-teal-600" />,
                title: 'Learn from Mistakes',
                description: 'Detailed explanations for every answer help you understand and improve.'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="card p-6 scroll-animation"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 scroll-animation">
            How It Works
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                icon: <Book className="h-6 w-6" />,
                title: 'Enter Your Topic',
                description: 'Type any topic or paste text you want to be quizzed on.'
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: 'AI Generation',
                description: 'Our AI creates a personalized 10-question quiz instantly.'
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: 'Test Your Knowledge',
                description: 'Answer questions and get immediate feedback with explanations.'
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="flex items-start mb-12 scroll-animation"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;