
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TutorChatProps {
  subject: string;
  onBack: () => void;
}

interface Message {
  id: number;
  sender: 'student' | 'tutor';
  text: string;
  timestamp: Date;
  type?: 'quiz' | 'game' | 'normal';
}

export const TutorChat = ({ subject, onBack }: TutorChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'tutor',
      text: `Hi! I'm your ${subject} tutor. I'm excited to help you learn! What would you like to explore today? I can teach you concepts, give you quizzes, or play learning games with you!`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const playSound = () => {
    if (soundEnabled) {
      // Simple sound effect simulation
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEUBzez2vZtYgAA');
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
  };

  const generateTutorResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    let response = '';
    let type: 'quiz' | 'game' | 'normal' = 'normal';

    if (message.includes('quiz') || message.includes('test')) {
      response = generateQuiz();
      type = 'quiz';
    } else if (message.includes('game') || message.includes('play')) {
      response = generateGame();
      type = 'game';
    } else if (message.includes('explain') || message.includes('what is')) {
      response = generateExplanation(subject, message);
    } else if (message.includes('example')) {
      response = generateExample(subject);
    } else if (message.includes('help') || message.includes('stuck')) {
      response = "Don't worry! Learning can be challenging sometimes. Let's break this down into smaller steps. What specific part are you having trouble with?";
    } else {
      response = generateContextualResponse(subject, message);
    }

    return {
      id: Date.now(),
      sender: 'tutor',
      text: response,
      timestamp: new Date(),
      type
    };
  };

  const generateQuiz = (): string => {
    const quizzes = {
      mathematics: [
        "Let's try a quick math problem! 🧮\n\nWhat is 15 × 8?\nA) 120\nB) 130\nC) 110\nD) 125\n\nType your answer (A, B, C, or D)!",
        "Math challenge time! 📊\n\nIf you have 24 apples and want to share them equally among 6 friends, how many apples does each friend get?\nA) 3\nB) 4\nC) 5\nD) 6\n\nWhat's your answer?"
      ],
      reading: [
        "Reading comprehension quiz! 📚\n\nWhich of these is a synonym for 'happy'?\nA) Sad\nB) Joyful\nC) Angry\nD) Tired\n\nPick your answer!",
        "Vocabulary challenge! 📖\n\nWhat does the word 'enormous' mean?\nA) Very small\nB) Very large\nC) Very fast\nD) Very slow\n\nWhat do you think?"
      ],
      science: [
        "Science quiz time! 🔬\n\nWhat do plants need to make their own food?\nA) Only water\nB) Only sunlight\nC) Sunlight, water, and carbon dioxide\nD) Only soil\n\nWhat's your answer?",
        "Let's test your science knowledge! 🌟\n\nWhich planet is closest to the Sun?\nA) Earth\nB) Mars\nC) Venus\nD) Mercury\n\nTake your best guess!"
      ]
    };

    const subjectQuizzes = quizzes[subject as keyof typeof quizzes] || quizzes.mathematics;
    return subjectQuizzes[Math.floor(Math.random() * subjectQuizzes.length)];
  };

  const generateGame = (): string => {
    const games = {
      mathematics: [
        "🎮 Number Detective Game!\n\nI'm thinking of a number between 1 and 50. It's even, greater than 20, and when you divide it by 4, you get 8. What number am I thinking of?\n\nType your guess!",
        "🎯 Math Pattern Game!\n\nComplete this sequence: 2, 4, 8, 16, ___\n\nWhat comes next? Can you figure out the pattern?"
      ],
      reading: [
        "📝 Story Building Game!\n\nLet's create a story together! I'll start:\n\n'Once upon a time, there was a brave little mouse who lived in a library...'\n\nAdd the next sentence to continue our story!",
        "🔤 Word Scramble Game!\n\nUnscramble this word: KBOO\n\nHint: You read this! What word is it?"
      ],
      science: [
        "🧪 Science Mystery Game!\n\nYou're a detective! A plant in the classroom is wilting even though it gets water every day. What might be wrong?\n\nA) Not enough sunlight\nB) Too much water\nC) Wrong type of soil\nD) All of the above could be possible\n\nWhat's your detective conclusion?",
        "🌍 Planet Explorer Game!\n\nYou're visiting different planets! On this planet, you weigh much less than on Earth, and a day lasts much longer. Where might you be?\n\nGive me your best guess!"
      ]
    };

    const subjectGames = games[subject as keyof typeof games] || games.mathematics;
    return subjectGames[Math.floor(Math.random() * subjectGames.length)];
  };

  const generateExplanation = (subject: string, message: string): string => {
    const explanations = {
      mathematics: "Great question! In mathematics, we use numbers and symbols to solve problems and understand patterns. Think of math like a puzzle - every problem has a solution, and there are different tools (like addition, subtraction, multiplication) to help us find it!",
      reading: "Reading is like going on adventures without leaving your seat! When we read, we're decoding symbols (letters and words) to understand stories, learn new facts, and explore different worlds. Every book is a new journey!",
      science: "Science is all about curiosity and discovery! It's how we understand the world around us - from why the sky is blue to how plants grow. Scientists ask questions, make observations, and do experiments to find answers!"
    };

    return explanations[subject as keyof typeof explanations] || "That's a wonderful question! Let me help you understand this concept better. Learning is all about asking questions and exploring new ideas together!";
  };

  const generateExample = (subject: string): string => {
    const examples = {
      mathematics: "Here's a fun math example! 🍕\n\nImagine you have a pizza cut into 8 slices. If you eat 3 slices, how many are left?\n8 - 3 = 5 slices remaining!\n\nMath is everywhere in daily life - from cooking to shopping to sharing snacks with friends!",
      reading: "Here's a reading example! 📚\n\nLet's look at this sentence: 'The curious cat climbed the tall tree.'\n\nNotice how 'curious' describes the cat, and 'tall' describes the tree? These describing words (adjectives) help paint a picture in our minds!",
      science: "Here's a cool science example! 🌱\n\nWhen you plant a seed and water it, you're doing science! The seed uses water, sunlight, and nutrients from soil to grow. It's like the plant is cooking its own food using these ingredients!"
    };

    return examples[subject as keyof typeof examples] || "Here's an example to help you understand better! Learning is like building with blocks - each new concept builds on what you already know!";
  };

  const generateContextualResponse = (subject: string, message: string): string => {
    const responses = [
      "That's a great observation! Let me help you explore this further. What specifically interests you about this topic?",
      "I love your curiosity! This is exactly the kind of thinking that makes learning fun. Let's dive deeper into this!",
      "Excellent question! You're thinking like a real scholar. Here's what I think might help you understand this better...",
      "That's fascinating! You know, many great discoveries started with questions just like yours. Let's explore this together!",
      "I can see you're really engaged with this topic! That's wonderful. Learning happens best when we're curious and asking questions."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'student',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate tutor thinking time
    setTimeout(() => {
      const tutorResponse = generateTutorResponse(inputValue);
      setMessages(prev => [...prev, tutorResponse]);
      setIsTyping(false);
      playSound();
      
      if (tutorResponse.type === 'quiz' || tutorResponse.type === 'game') {
        toast({
          title: "Interactive Activity!",
          description: "I've prepared something special for you!",
        });
      }
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const quickQuestions = [
    "Can you explain this again?",
    "Show me an example",
    "Let's play a game!",
    "Give me a quiz",
    "I need help with homework",
    "Tell me something interesting!"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="hover-scale">
          ← Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 capitalize">{subject} Tutor</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="hover-scale"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Your Personal {subject} Tutor
              {isTyping && <span className="text-sm animate-pulse">is typing...</span>}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg whitespace-pre-line ${
                      message.sender === 'student'
                        ? 'bg-blue-500 text-white'
                        : message.type === 'quiz' 
                        ? 'bg-green-100 text-green-800 border-2 border-green-300'
                        : message.type === 'game'
                        ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                        : 'bg-gray-100 text-gray-800'
                    } animate-fade-in hover-scale`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.type && (
                      <div className="mt-2 text-xs opacity-75">
                        {message.type === 'quiz' ? '📝 Quiz Time!' : '🎮 Game Mode!'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg animate-pulse">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs hover-scale"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={handleSendMessage} disabled={isTyping} className="hover-scale">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Sidebar */}
        <div className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Learning Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start hover-scale"
                onClick={() => handleQuickQuestion("Give me a quiz")}
              >
                📝 Interactive Quiz
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start hover-scale"
                onClick={() => handleQuickQuestion("Let's play a game!")}
              >
                🎮 Learning Game
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start hover-scale"
                onClick={() => handleQuickQuestion("Show me an example")}
              >
                📚 Examples & Practice
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start hover-scale"
                onClick={() => handleQuickQuestion("Can you explain this again?")}
              >
                💡 Step-by-Step Help
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Today's Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl animate-bounce">🎯</div>
                <p className="font-semibold">Excellent work!</p>
                <p className="text-sm text-gray-600">
                  Active learning time: {Math.floor(messages.length * 2)} minutes
                </p>
                <p className="text-sm text-green-600">
                  Messages exchanged: {messages.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Learning Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl">🔥</div>
                <p className="font-semibold text-orange-600">7 Days</p>
                <p className="text-sm text-gray-600">Keep it up!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
