
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Volume2, VolumeX, Sparkles, Heart, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createVoiceSynthesis } from '@/utils/voiceSynthesis';

interface AiTutorAvatarProps {
  currentSubject?: string;
  studentName?: string;
  onInteraction?: (message: string) => void;
}

interface TutorMessage {
  id: number;
  text: string;
  type: 'encouragement' | 'tip' | 'celebration' | 'reminder' | 'greeting';
  timestamp: Date;
}

const avatarExpressions = {
  happy: "😊",
  excited: "🤩", 
  thinking: "🤔",
  celebrating: "🎉",
  encouraging: "💪",
  wise: "🧠"
};

export const AiTutorAvatar = ({ 
  currentSubject = 'learning', 
  studentName = 'Student',
  onInteraction 
}: AiTutorAvatarProps) => {
  const [currentExpression, setCurrentExpression] = useState<keyof typeof avatarExpressions>('happy');
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceSynthesis] = useState(() => createVoiceSynthesis());
  const { toast } = useToast();

  const encouragementMessages = [
    "You're doing amazing! Keep up the great work! 🌟",
    "I believe in you! Every step counts! 💫",
    "Learning is an adventure, and you're the explorer! 🗺️",
    "Your curiosity is your superpower! ✨",
    "Mistakes are just stepping stones to success! 🚀",
    "You're growing smarter every moment! 🌱"
  ];

  const tipMessages = [
    "💡 Pro tip: Take breaks every 20 minutes to help your brain absorb information!",
    "🎯 Try explaining what you've learned to someone else - it really helps!",
    "📚 Reading aloud can improve your comprehension by 30%!",
    "🧩 Breaking big problems into smaller pieces makes them easier to solve!",
    "⭐ Celebrating small wins keeps you motivated for bigger challenges!"
  ];

  const celebrationMessages = [
    "🎉 Outstanding work! You're on fire today!",
    "🏆 Champion mindset! That's how it's done!",
    "✨ Brilliant! Your hard work is paying off!",
    "🎊 Fantastic progress! I'm so proud of you!",
    "🌟 Incredible! You're exceeding expectations!"
  ];

  const generateContextualMessage = (): TutorMessage => {
    const hour = new Date().getHours();
    const messageTypes = ['encouragement', 'tip', 'celebration'] as const;
    const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
    
    let messagePool: string[] = [];
    let type: TutorMessage['type'] = randomType;

    if (hour < 12) {
      messagePool = [`Good morning, ${studentName}! Ready to conquer some ${currentSubject} today? 🌅`];
      type = 'greeting';
    } else if (hour < 17) {
      messagePool = [`Afternoon energy boost! You're doing great with ${currentSubject}! ⚡`];
      type = 'encouragement';
    } else {
      messagePool = [`Evening learning session! Perfect time for ${currentSubject} mastery! 🌙`];
      type = 'encouragement';
    }

    switch (randomType) {
      case 'encouragement':
        messagePool = encouragementMessages;
        break;
      case 'tip':
        messagePool = tipMessages;
        break;
      case 'celebration':
        messagePool = celebrationMessages;
        break;
    }

    return {
      id: Date.now(),
      text: messagePool[Math.floor(Math.random() * messagePool.length)],
      type,
      timestamp: new Date()
    };
  };

  const speakMessage = async (text: string) => {
    if (soundEnabled) {
      try {
        const cleanText = text.replace(/[🎉🌟💫✨🚀🌱💡🎯📚🧩⭐🏆🎊🌅⚡🌙😊🤩🤔💪🧠]/g, '');
        await voiceSynthesis.speak(cleanText);
      } catch (error) {
        console.log('Voice synthesis not available');
      }
    }
  };

  const addMessage = (message: TutorMessage) => {
    setMessages(prev => [message, ...prev.slice(0, 4)]); // Keep only last 5 messages
    speakMessage(message.text);
    
    // Set appropriate expression based on message type
    const expressionMap: Record<TutorMessage['type'], keyof typeof avatarExpressions> = {
      encouragement: 'encouraging',
      tip: 'wise',
      celebration: 'celebrating',
      reminder: 'thinking',
      greeting: 'happy'
    };
    
    setCurrentExpression(expressionMap[message.type]);
    setIsAnimating(true);
    
    setTimeout(() => setIsAnimating(false), 1000);
    
    onInteraction?.(message.text);
  };

  const handleAvatarClick = () => {
    const message = generateContextualMessage();
    addMessage(message);
    
    toast({
      title: "AI Tutor says:",
      description: message.text,
      duration: 3000,
    });
  };

  // Automatic encouraging messages
  useEffect(() => {
    const interval = setInterval(() => {
      const message = generateContextualMessage();
      addMessage(message);
    }, 60000); // Every minute

    // Initial greeting
    setTimeout(() => {
      const greeting: TutorMessage = {
        id: Date.now(),
        text: `Hello ${studentName}! I'm your AI learning companion. Click on me anytime for encouragement! 🤗`,
        type: 'greeting',
        timestamp: new Date()
      };
      addMessage(greeting);
    }, 2000);

    return () => clearInterval(interval);
  }, [studentName, currentSubject]);

  // Expression cycling for liveliness
  useEffect(() => {
    const expressionCycle = setInterval(() => {
      if (!isAnimating) {
        const expressions = Object.keys(avatarExpressions) as Array<keyof typeof avatarExpressions>;
        const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
        setCurrentExpression(randomExpression);
      }
    }, 8000);

    return () => clearInterval(expressionCycle);
  }, [isAnimating]);

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
      {/* Avatar Card */}
      <Card className="bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4 text-center">
          <div 
            className={`cursor-pointer transition-transform duration-300 ${
              isAnimating ? 'animate-bounce' : 'hover:scale-110'
            }`}
            onClick={handleAvatarClick}
          >
            <Avatar className="w-20 h-20 mx-auto mb-3 ring-4 ring-purple-300 ring-opacity-50">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="AI Tutor" />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white text-2xl">
                {avatarExpressions[currentExpression]}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <h3 className="font-bold text-purple-800 mb-1">AI Tutor Luna</h3>
          <p className="text-xs text-purple-600 mb-3">Your Learning Companion</p>
          
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="hover-scale"
            >
              {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAvatarClick}
              className="hover-scale"
            >
              <MessageCircle className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Messages */}
      {messages.length > 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border border-purple-200 shadow-md max-w-xs">
          <CardContent className="p-3">
            <div className="space-y-2">
              {messages.slice(0, 2).map((message) => (
                <div
                  key={message.id}
                  className="text-xs p-2 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 animate-fade-in"
                >
                  <div className="flex items-start gap-2">
                    <div className="text-lg">
                      {message.type === 'celebration' && '🎉'}
                      {message.type === 'encouragement' && '💪'}
                      {message.type === 'tip' && '💡'}
                      {message.type === 'greeting' && '👋'}
                      {message.type === 'reminder' && '⏰'}
                    </div>
                    <p className="text-purple-800 leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Particles for Extra Liveliness */}
      <div className="absolute -top-2 -right-2 pointer-events-none">
        <Sparkles className={`w-6 h-6 text-yellow-400 ${isAnimating ? 'animate-spin' : 'animate-pulse'}`} />
      </div>
      <div className="absolute -bottom-2 -left-2 pointer-events-none">
        <Star className={`w-4 h-4 text-purple-400 ${isAnimating ? 'animate-bounce' : 'animate-pulse'}`} />
      </div>
      <div className="absolute top-1/2 -right-4 pointer-events-none">
        <Heart className={`w-3 h-3 text-pink-400 ${isAnimating ? 'animate-ping' : 'animate-pulse'}`} />
      </div>
    </div>
  );
};
