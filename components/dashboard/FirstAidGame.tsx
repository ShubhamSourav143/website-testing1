'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image?: string;
}

interface GameState {
  currentQuestionIndex: number;
  score: number;
  answeredQuestions: number[];
  selectedOption: number | null;
  showExplanation: boolean;
  gameCompleted: boolean;
  streak: number;
  highestStreak: number;
}

interface FirstAidGameProps {
  userId: string;
}

export default function FirstAidGame({ userId }: FirstAidGameProps) {
  // In a real app, these would come from a database
  const questions: Question[] = [
    {
      id: 1,
      question: "What should you do first if you find an injured stray dog?",
      options: [
        "Approach quickly and pick it up",
        "Call for help and maintain a safe distance",
        "Try to feed it immediately",
        "Make loud noises to check its response"
      ],
      correctAnswer: 1,
      explanation: "Always prioritize safety. Injured animals may be frightened and react aggressively. Call for help and maintain a safe distance while observing the animal.",
      image: "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 2,
      question: "How should you transport an injured cat to a veterinarian?",
      options: [
        "Carry it in your arms",
        "Use a leash and collar",
        "Place it in a secure carrier or box with ventilation",
        "Wrap it tightly in a blanket"
      ],
      correctAnswer: 2,
      explanation: "A secure carrier or box with ventilation is the safest way to transport an injured cat. This prevents further injury and reduces stress for the animal.",
      image: "https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 3,
      question: "What is the correct approach for a dog that appears to be choking?",
      options: [
        "Perform the Heimlich maneuver immediately",
        "Force water down its throat",
        "Open the mouth and pull the tongue forward to check for objects",
        "Hold the dog upside down by its legs"
      ],
      correctAnswer: 2,
      explanation: "For a choking dog, carefully open its mouth and look for any visible objects. If you can see an object, try to remove it. If you can't see anything or can't remove it safely, seek immediate veterinary help.",
      image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 4,
      question: "What should you apply to a bleeding wound on an animal?",
      options: [
        "Alcohol or hydrogen peroxide",
        "Clean, direct pressure with a cloth or gauze",
        "Hot water",
        "Butter or oil"
      ],
      correctAnswer: 1,
      explanation: "Apply clean, direct pressure with a cloth or gauze to stop bleeding. Avoid using alcohol or hydrogen peroxide as they can damage tissue and delay healing.",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 5,
      question: "What is the first step if you find a bird with a broken wing?",
      options: [
        "Try to set the wing back in place",
        "Feed it immediately",
        "Gently place it in a ventilated box in a quiet, dark place",
        "Release it in a tree"
      ],
      correctAnswer: 2,
      explanation: "For a bird with a broken wing, gently place it in a ventilated box in a quiet, dark place to reduce stress. Do not attempt to set the wing, as this could cause more damage.",
      image: "https://images.pexels.com/photos/1418241/pexels-photo-1418241.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 6,
      question: "How should you approach a stray dog that appears friendly?",
      options: [
        "Run toward it with treats",
        "Stare directly into its eyes to establish dominance",
        "Crouch down, avoid direct eye contact, and let it approach you",
        "Make loud noises to get its attention"
      ],
      correctAnswer: 2,
      explanation: "When approaching a stray dog, crouch down to appear less threatening, avoid direct eye contact which can be seen as a challenge, and allow the dog to approach you. This reduces the dog's anxiety and prevents defensive reactions.",
      image: "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 7,
      question: "What should you do if you find a puppy or kitten that appears abandoned?",
      options: [
        "Immediately take it home and keep it",
        "Leave it alone - the mother might return",
        "Monitor from a distance, and if the mother doesn't return in 4-6 hours, seek help",
        "Give it food and water and leave it there"
      ],
      correctAnswer: 2,
      explanation: "Mother animals often leave their young temporarily to find food. Monitor from a distance for several hours. If the mother doesn't return after 4-6 hours, the young may be abandoned and need help.",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 8,
      question: "What is the best way to handle a frightened cat?",
      options: [
        "Pick it up quickly before it can run away",
        "Make loud noises to distract it",
        "Use a towel or thick gloves to handle it gently",
        "Spray it with water to calm it down"
      ],
      correctAnswer: 2,
      explanation: "Use a towel or thick gloves to handle a frightened cat gently. This protects you from scratches and bites while minimizing stress for the cat. Approach slowly and speak softly.",
      image: "https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 9,
      question: "What should you do if you find a dog overheating on a hot day?",
      options: [
        "Immediately immerse it in ice water",
        "Move it to shade, offer small amounts of cool water, and wet its paws and body with cool (not cold) water",
        "Give it cold water to drink as quickly as possible",
        "Cover it with a wet blanket"
      ],
      correctAnswer: 1,
      explanation: "For an overheating dog, move it to shade, offer small amounts of cool water, and wet its paws and body with cool (not cold) water. Avoid ice water as it can cause shock. Seek veterinary care immediately.",
      image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 10,
      question: "What is the correct way to approach an injured cow or buffalo on campus?",
      options: [
        "Approach from behind to avoid being seen",
        "Make loud noises to move it to safety",
        "Don't approach - call campus animal welfare or local authorities",
        "Try to lead it away with food"
      ],
      correctAnswer: 2,
      explanation: "Large animals like cows or buffaloes can be dangerous when injured or frightened. Do not approach them yourself. Call campus animal welfare or local authorities who have the proper equipment and training.",
      image: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    answeredQuestions: [],
    selectedOption: null,
    showExplanation: false,
    gameCompleted: false,
    streak: 0,
    highestStreak: 0
  });

  // Load saved game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(`firstaid_game_${userId}`);
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  }, [userId]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`firstaid_game_${userId}`, JSON.stringify(gameState));
  }, [gameState, userId]);

  const handleOptionSelect = (optionIndex: number) => {
    if (gameState.selectedOption !== null) return; // Prevent changing answer
    
    setGameState(prev => ({
      ...prev,
      selectedOption: optionIndex,
      showExplanation: true
    }));
    
    const currentQuestion = questions[gameState.currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      const newStreak = gameState.streak + 1;
      const newHighestStreak = Math.max(newStreak, gameState.highestStreak);
      
      setGameState(prev => ({
        ...prev,
        score: prev.score + 10,
        streak: newStreak,
        highestStreak: newHighestStreak
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        streak: 0
      }));
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[gameState.currentQuestionIndex];
    
    // Add current question to answered questions
    const updatedAnsweredQuestions = [...gameState.answeredQuestions, currentQuestion.id];
    
    // Check if all questions have been answered
    if (updatedAnsweredQuestions.length === questions.length) {
      setGameState(prev => ({
        ...prev,
        answeredQuestions: updatedAnsweredQuestions,
        gameCompleted: true,
        showExplanation: false,
        selectedOption: null
      }));
      return;
    }
    
    // Find next unanswered question
    let nextIndex = (gameState.currentQuestionIndex + 1) % questions.length;
    while (updatedAnsweredQuestions.includes(questions[nextIndex].id)) {
      nextIndex = (nextIndex + 1) % questions.length;
    }
    
    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
      answeredQuestions: updatedAnsweredQuestions,
      selectedOption: null,
      showExplanation: false
    }));
  };

  const resetGame = () => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      answeredQuestions: [],
      selectedOption: null,
      showExplanation: false,
      gameCompleted: false,
      streak: 0,
      highestStreak: gameState.highestStreak // Preserve highest streak
    });
  };

  const currentQuestion = questions[gameState.currentQuestionIndex];
  const progress = (gameState.answeredQuestions.length / questions.length) * 100;

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Animal First Aid Training</h2>
        <div className="mt-2 sm:mt-0 flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Score:</span>
            <span className="text-xl font-bold text-orange-500">{gameState.score}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Streak:</span>
            <span className={`text-xl font-bold ${gameState.streak > 2 ? 'text-green-500' : 'text-gray-700'}`}>
              {gameState.streak}🔥
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-orange-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 text-right">{gameState.answeredQuestions.length}/{questions.length} questions</p>

      {gameState.gameCompleted ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
          <div className="inline-block p-4 rounded-full bg-orange-100 text-orange-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Training Complete!</h3>
          <p className="text-gray-600 mb-6">
            You've completed the Animal First Aid Training with a score of <span className="font-bold text-orange-500">{gameState.score}</span> points.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500">Questions</p>
              <p className="text-2xl font-bold">{questions.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500">Correct</p>
              <p className="text-2xl font-bold text-green-500">{gameState.score / 10}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500">Best Streak</p>
              <p className="text-2xl font-bold">{gameState.highestStreak}🔥</p>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Play Again
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Question Image */}
          {currentQuestion.image && (
            <div className="h-48 sm:h-64 overflow-hidden">
              <img src={currentQuestion.image} alt="Question illustration" className="w-full h-full object-cover" />
            </div>
          )}
          
          {/* Question */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              <span className="bg-orange-100 text-orange-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                Question {gameState.answeredQuestions.length + 1}
              </span>
              {currentQuestion.question}
            </h3>
            
            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={gameState.selectedOption !== null}
                  className={`w-full text-left p-3 rounded-lg border ${
                    gameState.selectedOption === null
                      ? 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                      : gameState.selectedOption === index
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-gray-50 opacity-70'
                  } transition-colors`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full border ${
                      gameState.selectedOption === null
                        ? 'border-gray-400'
                        : gameState.selectedOption === index
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-red-500 bg-red-500'
                          : index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-400'
                    } mr-3 mt-0.5`}></div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Explanation */}
            {gameState.showExplanation && (
              <div className={`p-4 rounded-lg mb-4 ${
                gameState.selectedOption === currentQuestion.correctAnswer
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <h4 className={`font-medium mb-1 ${
                  gameState.selectedOption === currentQuestion.correctAnswer
                    ? 'text-green-800'
                    : 'text-red-800'
                }`}>
                  {gameState.selectedOption === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                </h4>
                <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
              </div>
            )}
            
            {/* Next Button */}
            {gameState.selectedOption !== null && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                {gameState.answeredQuestions.length === questions.length - 1 ? 'Complete Training' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
        <h3 className="font-medium text-orange-800 mb-2">Why First Aid Knowledge Matters</h3>
        <p className="text-sm text-orange-700">
          Knowing basic animal first aid can make a critical difference in emergency situations. These skills help you provide immediate care while seeking professional veterinary help.
        </p>
      </div>
    </div>
  );
}