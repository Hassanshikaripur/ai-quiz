import { GoogleGenerativeAI } from '@google/generative-ai';
import { QuizData } from '../types/quiz';

const API_KEY = 'AIzaSyDh8Igr0MhT4FXTIo6mHdjk3VrKdjWGQp8';
const MODEL_NAME = 'gemini-2.0-flash';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export const generateQuizQuestions = async (topic: string): Promise<QuizData> => {
  try {
    const prompt = `
    Create a 10-question multiple-choice quiz about "${topic}". 
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
    
    Make the quiz properly challenging with varying difficulty levels.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON response from AI');
    }

    const quizData: QuizData = JSON.parse(jsonMatch[0]);

    // Validate the response format
    if (!quizData.topic || !quizData.questions || quizData.questions.length !== 10) {
      throw new Error('Invalid quiz data format');
    }

    return quizData;
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    throw new Error('Failed to generate quiz. Please try again.');
  }
};