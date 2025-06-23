import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { createVoiceSynthesis } from '@/utils/voiceSynthesis';
import { Play, Pause, Volume2, VolumeX, Mic, MicOff, RotateCcw, Trophy, Star, Zap } from 'lucide-react';

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionInstance {
  onstart: () => void;
  onend: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  start: () => void;
}

export const InteractiveLearningElements = () => {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [currentActivity, setCurrentActivity] = useState('word-match');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  
  const [wordMatchGame, setWordMatchGame] = useState({
    words: ['apple', 'banana', 'cherry', 'date'],
    currentWord: 'apple',
    userInput: '',
    attempts: 0,
    completed: []
  });

  const [mathPuzzle, setMathPuzzle] = useState({
    equation: '5 + 3 = ?',
    answer: 8,
    userAnswer: '',
    hints: ['Think about counting on your fingers', 'Start with 5 and add 3 more'],
    currentHint: 0
  });

  const [storyBuilder, setStoryBuilder] = useState({
    prompt: 'Once upon a time, there was a curious cat...',
    userStory: '',
    suggestions: ['explored the garden', 'met a friendly dog', 'found a magic door']
  });

  const { toast } = useToast();
  const voiceSynth = createVoiceSynthesis({ rate: 0.9, pitch: 1.1, volume: 0.8 });

  const speak = async (text: string) => {
    if (voiceEnabled) {
      try {
        await voiceSynth.speak(text);
      } catch (error) {
        console.log('Voice synthesis not available');
      }
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition: SpeechRecognitionInstance = new SpeechRecognition();
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceInput(transcript);
      };
      
      recognition.start();
    } else {
      toast({
        title: "Voice Recognition Unavailable",
        description: "Please use text input or try a different browser.",
      });
    }
  };

  const handleVoiceInput = (transcript: string) => {
    if (currentActivity === 'word-match') {
      setWordMatchGame(prev => ({ ...prev, userInput: transcript }));
    } else if (currentActivity === 'math') {
      setMathPuzzle(prev => ({ ...prev, userAnswer: transcript }));
    } else if (currentActivity === 'story') {
      setStoryBuilder(prev => ({ ...prev, userStory: prev.userStory + ' ' + transcript }));
    }
  };

  const checkWordMatch = () => {
    const isCorrect = wordMatchGame.userInput.toLowerCase() === wordMatchGame.currentWord.toLowerCase();
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      speak(`Excellent! ${wordMatchGame.currentWord} is correct!`);
      
      const newCompleted = [...wordMatchGame.completed, wordMatchGame.currentWord];
      const remainingWords = wordMatchGame.words.filter(word => !newCompleted.includes(word));
      
      if (remainingWords.length > 0) {
        const nextWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
        setWordMatchGame(prev => ({
          ...prev,
          currentWord: nextWord,
          userInput: '',
          completed: newCompleted,
          attempts: 0
        }));
        speak(`Great job! Now let's try: ${nextWord}`);
      } else {
        toast({
          title: "Congratulations! 🎉",
          description: "You've completed all the words!",
        });
        speak("Fantastic! You've completed all the words! You're amazing!");
      }
    } else {
      setWordMatchGame(prev => ({ ...prev, attempts: prev.attempts + 1 }));
      if (wordMatchGame.attempts < 2) {
        speak("Not quite right. Listen carefully and try again.");
      } else {
        speak(`The correct spelling is: ${wordMatchGame.currentWord}. Let's try the next word.`);
        // Move to next word after 3 attempts
        const remainingWords = wordMatchGame.words.filter(word => !wordMatchGame.completed.includes(word));
        if (remainingWords.length > 1) {
          const nextWord = remainingWords.find(word => word !== wordMatchGame.currentWord) || remainingWords[0];
          setWordMatchGame(prev => ({
            ...prev,
            currentWord: nextWord,
            userInput: '',
            attempts: 0
          }));
        }
      }
    }
  };

  const checkMathAnswer = () => {
    const userNum = parseInt(mathPuzzle.userAnswer);
    if (userNum === mathPuzzle.answer) {
      setScore(prev => prev + 15);
      setStreak(prev => prev + 1);
      speak("Perfect! That's the right answer!");
      toast({
        title: "Correct! 🎯",
        description: "You solved the math problem!",
      });
      
      // Generate new problem
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setMathPuzzle({
        equation: `${num1} + ${num2} = ?`,
        answer: num1 + num2,
        userAnswer: '',
        hints: [`Think about counting to ${num1 + num2}`, `Start with ${num1} and add ${num2} more`],
        currentHint: 0
      });
    } else {
      speak("Not quite right. Would you like a hint?");
    }
  };

  const giveHint = () => {
    if (mathPuzzle.currentHint < mathPuzzle.hints.length) {
      speak(mathPuzzle.hints[mathPuzzle.currentHint]);
      setMathPuzzle(prev => ({ ...prev, currentHint: prev.currentHint + 1 }));
    }
  };

  const addStorySuggestion = (suggestion: string) => {
    setStoryBuilder(prev => ({
      ...prev,
      userStory: prev.userStory + ' ' + suggestion
    }));
    speak(`Great addition! ${suggestion}`);
  };

  useEffect(() => {
    // Welcome message when component loads
    speak("Welcome to your interactive learning playground! Choose an activity to get started.");
  }, []);

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <Zap className="w-6 h-6 text-purple-500" />
              Interactive Learning Playground
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                Score: {score}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                Streak: {streak}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="hover-scale"
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Voice-powered interactive learning with real-time feedback and encouragement
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Button
          variant={currentActivity === 'word-match' ? 'default' : 'outline'}
          onClick={() => {
            setCurrentActivity('word-match');
            speak("Let's practice spelling! I'll say a word and you spell it.");
          }}
          className="hover-scale"
        >
          📝 Word Spelling
        </Button>
        <Button
          variant={currentActivity === 'math' ? 'default' : 'outline'}
          onClick={() => {
            setCurrentActivity('math');
            speak("Time for some math fun! Let's solve problems together.");
          }}
          className="hover-scale"
        >
          🧮 Math Puzzles
        </Button>
        <Button
          variant={currentActivity === 'story' ? 'default' : 'outline'}
          onClick={() => {
            setCurrentActivity('story');
            speak("Let's create an amazing story together!");
          }}
          className="hover-scale"
        >
          📚 Story Builder
        </Button>
      </div>

      {currentActivity === 'word-match' && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Word Spelling Challenge</CardTitle>
            <p className="text-sm text-gray-600">Listen to the word and spell it correctly!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Button
                onClick={() => speak(wordMatchGame.currentWord)}
                className="hover-scale mb-4"
              >
                <Play className="w-4 h-4 mr-2" />
                Hear the Word: "{wordMatchGame.currentWord}"
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Type the word you heard..."
                value={wordMatchGame.userInput}
                onChange={(e) => setWordMatchGame(prev => ({ ...prev, userInput: e.target.value }))}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && checkWordMatch()}
              />
              <Button
                onClick={startListening}
                variant="outline"
                disabled={isListening}
                className="hover-scale"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button onClick={checkWordMatch} className="hover-scale">
                Check
              </Button>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Attempts: {wordMatchGame.attempts}/3</span>
              <span>Completed: {wordMatchGame.completed.length}/{wordMatchGame.words.length}</span>
            </div>

            <Progress value={(wordMatchGame.completed.length / wordMatchGame.words.length) * 100} />
          </CardContent>
        </Card>
      )}

      {currentActivity === 'math' && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Math Problem Solver</CardTitle>
            <p className="text-sm text-gray-600">Solve the equation and hear encouraging feedback!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-4">{mathPuzzle.equation}</div>
              <Button
                onClick={() => speak(`The problem is: ${mathPuzzle.equation}`)}
                variant="outline"
                className="hover-scale mb-4"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Hear the Problem
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Enter your answer..."
                value={mathPuzzle.userAnswer}
                onChange={(e) => setMathPuzzle(prev => ({ ...prev, userAnswer: e.target.value }))}
                type="number"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && checkMathAnswer()}
              />
              <Button
                onClick={startListening}
                variant="outline"
                disabled={isListening}
                className="hover-scale"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button onClick={checkMathAnswer} className="hover-scale">
                Check
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={giveHint} variant="outline" className="hover-scale">
                💡 Get Hint
              </Button>
              <Button 
                onClick={() => {
                  setMathPuzzle(prev => ({ ...prev, userAnswer: '', currentHint: 0 }));
                  speak("Let's try this problem again!");
                }}
                variant="outline" 
                className="hover-scale"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentActivity === 'story' && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Collaborative Story Builder</CardTitle>
            <p className="text-sm text-gray-600">Create an amazing story with voice input and suggestions!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Story Starter:</h4>
              <p className="text-blue-700">{storyBuilder.prompt}</p>
              <Button
                onClick={() => speak(storyBuilder.prompt)}
                variant="outline"
                size="sm"
                className="mt-2 hover-scale"
              >
                <Volume2 className="w-3 h-3 mr-1" />
                Hear Story Start
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Continue the story:</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="What happens next in the story?"
                  value={storyBuilder.userStory}
                  onChange={(e) => setStoryBuilder(prev => ({ ...prev, userStory: e.target.value }))}
                  className="flex-1"
                />
                <Button
                  onClick={startListening}
                  variant="outline"
                  disabled={isListening}
                  className="hover-scale"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Story suggestions:</h4>
              <div className="flex flex-wrap gap-2">
                {storyBuilder.suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    onClick={() => addStorySuggestion(suggestion)}
                    variant="outline"
                    size="sm"
                    className="hover-scale"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {storyBuilder.userStory && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Your Story So Far:</h4>
                <p className="text-green-700">{storyBuilder.prompt} {storyBuilder.userStory}</p>
                <Button
                  onClick={() => speak(storyBuilder.prompt + ' ' + storyBuilder.userStory)}
                  variant="outline"
                  size="sm"
                  className="mt-2 hover-scale"
                >
                  <Volume2 className="w-3 h-3 mr-1" />
                  Hear Complete Story
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Today's Learning Progress</h3>
              <p className="text-sm text-gray-600">Keep up the amazing work!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
