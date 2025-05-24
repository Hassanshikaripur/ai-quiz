import { GoogleGenerativeAI } from '@google/generative-ai';
import { QuizData } from '../types/quiz';

const API_KEY = 'AIzaSyDh8Igr0MhT4FXTIo6mHdjk3VrKdjWGQp8';
const MODEL_NAME = 'gemini-2.0-flash';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export const generateQuizQuestions = async (topic: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<QuizData> => {
  try {
    const prompt = `
    Create a 10-question multiple-choice quiz about "${topic}" with ${difficulty} difficulty level. 
    For each question:
    1. Provide a clear question
    2. Provide exactly 4 answer options (labeled A, B, C, D)
    3. Indicate which option is correct (0-based index, where 0=A, 1=B, 2=C, 3=D)
    4. Include a brief explanation for the correct answer

    Format your response as a JSON object with this exact structure (and nothing else):
    {
      "topic": "${topic}",
      "questions": [
        {
          "id": 0,
          "question": "Question text here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Explanation for why A is correct"
        },
        ...and so on for all 10 questions
      ]
    }
    
    For ${difficulty} difficulty:
    - Easy: Basic knowledge and straightforward questions
    - Medium: More detailed questions requiring good understanding
    - Hard: Complex questions requiring deep knowledge
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON response from AI');
    }

    const quizData: QuizData = {
      ...JSON.parse(jsonMatch[0]),
      difficulty,
      timePerQuestion: difficulty === 'easy' ? 30 : difficulty === 'medium' ? 45 : 60
    };

    if (!quizData.topic || !quizData.questions || quizData.questions.length !== 10) {
      throw new Error('Invalid quiz data format');
    }

    return quizData;
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    throw new Error('Failed to generate quiz. Please try again.');
  }
};

export const generateStudyMaterials = async (topic: string): Promise<string> => {
  try {
    const prompt = `
    Create a concise study guide for "${topic}" that includes:
    1. Key concepts and definitions
    2. Important points to remember
    3. Examples where applicable
    4. Common misconceptions
    
    Format the response as this:
    +------------+------------+------------+------------+------------+------------+------------+
| Time       | Monday     | Tuesday    | Wednesday  | Thursday   | Friday     | Saturday   |
+------------+------------+------------+------------+------------+------------+------------+
| 08:00-09:00| Math       | Physics    | Chemistry  | Biology    | English    |            |
| 09:00-10:00| English    | Math       | Physics    | Chemistry  | Biology    |            |
| 10:00-11:00|            |            |            |            |            |            |
| 11:00-12:00|            |            |            |            |            |            |
| 12:00-01:00| Lunch Break                                                                 |
| 01:00-02:00|            |            |            |            |            |            |
| 02:00-03:00|            |            |            |            |            |            |
+------------+------------+------------+------------+------------+------------+------------+

    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating study materials:', error);
    throw new Error('Failed to generate study materials. Please try again.');
  }
};

export const generatePersonalizedFeedback = async (
  topic: string,
  questions: any[],
  userAnswers: number[],
  correctAnswers: number[]
): Promise<string> => {
  try {
    const incorrectQuestions = questions.filter((_, index) => userAnswers[index] !== correctAnswers[index]);
    
    const prompt = `
    Analyze the quiz performance on "${topic}" and provide personalized feedback:
    
    Questions answered incorrectly:
    ${incorrectQuestions.map(q => q.question).join('\n')}
    
    Provide:
    1. Analysis of common mistakes
    2. Specific areas that need improvement
    3. Recommended study resources
    4. Tips for better understanding of the topic
    
    Format the response in markdown.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw new Error('Failed to generate feedback. Please try again.');
  }
};

export const generateStudyTimetable = async (
  topics: string[],
  performance: { topic: string; score: number }[]
): Promise<string> => {
  try {
    const prompt = `
    Create a personalized weekly study timetable based on these topics and quiz performance:
    
    Topics to study: ${topics.join(', ')}
    
    Performance data:
    ${performance.map(p => `${p.topic}: ${p.score}%`).join('\n')}
    
    Create a detailed study schedule that:
    1. Prioritizes topics with lower scores
    2. Allocates more time to challenging subjects
    3. Includes breaks and review sessions
    4. Suggests specific study activities
    5. Provides time management tips
    
    Format the response in markdown with:
    - Daily schedule
    - Study techniques for each topic
    - Break recommendations
    - Progress tracking tips
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating study timetable:', error);
    throw new Error('Failed to generate study timetable. Please try again.');
  }
};