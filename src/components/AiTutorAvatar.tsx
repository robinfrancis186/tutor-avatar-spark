import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Volume2, VolumeX, Sparkles, Heart, Star, Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OpenVoiceService } from '@/utils/openVoiceService';

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
  wise: "🧠",
  listening: "👂",
  speaking: "🗣️"
};

export const AiTutorAvatar = ({ 
  currentSubject = 'learning', 
  studentName = 'Student',
  onInteraction 
}: AiTutorAvatarProps) => {
  const [currentExpression, setCurrentExpression] = useState<keyof typeof avatarExpressions>('happy');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceService] = useState(() => new OpenVoiceService());
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
    if (soundEnabled && voiceService) {
      try {
        setIsSpeaking(true);
        setCurrentExpression('speaking');
        const cleanText = text.replace(/[🎉🌟💫✨🚀🌱💡🎯📚🧩⭐🏆🎊🌅⚡🌙😊🤩🤔💪🧠]/g, '');
        await voiceService.speak(cleanText);
      } catch (error) {
        console.log('OpenVoice synthesis not available, falling back to browser TTS');
        // Fallback to browser TTS
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      } finally {
        setIsSpeaking(false);
        setCurrentExpression('happy');
      }
    }
  };

  const addMessage = (message: TutorMessage) => {
    setMessages(prev => [message, ...prev.slice(0, 4)]);
    speakMessage(message.text);
    
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
      title: "AI Tutor Luna says:",
      description: message.text,
      duration: 3000,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const message = generateContextualMessage();
      addMessage(message);
    }, 60000);

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

  useEffect(() => {
    const expressionCycle = setInterval(() => {
      if (!isAnimating && !isSpeaking) {
        const expressions = Object.keys(avatarExpressions) as Array<keyof typeof avatarExpressions>;
        const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
        setCurrentExpression(randomExpression);
      }
    }, 8000);

    return () => clearInterval(expressionCycle);
  }, [isAnimating, isSpeaking]);

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
      {/* Enhanced Avatar Card with improved gradients and animations */}
      <Card className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 border-2 border-purple-300 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm">
        <CardContent className="p-6 text-center relative overflow-hidden">
          {/* Animated background particles */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-3 w-1 h-1 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></div>
          </div>
          
          <div 
            className={`cursor-pointer transition-all duration-500 ${
              isAnimating || isSpeaking 
                ? 'animate-bounce scale-110' 
                : 'hover:scale-110 hover:rotate-3'
            }`}
            onClick={handleAvatarClick}
          >
            <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-purple-400 ring-opacity-60 shadow-lg transition-all duration-300">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="AI Tutor Luna" />
              <AvatarFallback className={`bg-gradient-to-br from-purple-500 to-blue-500 text-white text-3xl transition-all duration-300 ${
                isSpeaking ? 'animate-pulse bg-gradient-to-br from-green-500 to-blue-500' : ''
              }`}>
                {avatarExpressions[currentExpression]}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <h3 className="font-bold text-purple-800 mb-1 text-lg">AI Tutor Luna</h3>
          <p className="text-xs text-purple-600 mb-4 font-medium">Your Learning Companion</p>
          
          {/* Status indicator */}
          <div className="flex justify-center mb-3">
            {isSpeaking && (
              <div className="flex items-center space-x-1 text-xs text-green-600 font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Speaking...</span>
              </div>
            )}
            {isListening && (
              <div className="flex items-center space-x-1 text-xs text-blue-600 font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                <span>Listening...</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="hover-scale border-purple-300 hover:bg-purple-50 transition-all duration-200"
            >
              {soundEnabled ? 
                <Volume2 className="w-3 h-3 text-purple-600" /> : 
                <VolumeX className="w-3 h-3 text-gray-500" />
              }
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAvatarClick}
              className="hover-scale border-purple-300 hover:bg-purple-50 transition-all duration-200"
            >
              <MessageCircle className="w-3 h-3 text-purple-600" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Recent Messages with better styling */}
      {messages.length > 0 && (
        <Card className="bg-white/95 backdrop-blur-md border border-purple-200 shadow-xl max-w-xs transition-all duration-300 hover:shadow-2xl">
          <CardContent className="p-4">
            <div className="space-y-3">
              {messages.slice(0, 2).map((message, index) => (
                <div
                  key={message.id}
                  className={`text-xs p-3 rounded-xl bg-gradient-to-r border transition-all duration-300 hover:scale-105 ${
                    index === 0 
                      ? 'from-purple-50 via-blue-50 to-indigo-50 border-purple-200 shadow-md' 
                      : 'from-purple-25 via-blue-25 to-indigo-25 border-purple-100 opacity-75'
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-2">
                    <div className="text-lg flex-shrink-0">
                      {message.type === 'celebration' && '🎉'}
                      {message.type === 'encouragement' && '💪'}
                      {message.type === 'tip' && '💡'}
                      {message.type === 'greeting' && '👋'}
                      {message.type === 'reminder' && '⏰'}
                    </div>
                    <p className="text-purple-800 leading-relaxed font-medium">{message.text}</p>
                  </div>
                  <div className="text-xs text-purple-500 mt-2 text-right opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Floating Particles */}
      <div className="absolute -top-4 -right-4 pointer-events-none">
        <Sparkles className={`w-8 h-8 text-yellow-400 drop-shadow-lg ${
          isAnimating ? 'animate-spin' : 'animate-pulse'
        }`} />
      </div>
      <div className="absolute -bottom-4 -left-4 pointer-events-none">
        <Star className={`w-6 h-6 text-purple-400 drop-shadow-lg ${
          isAnimating ? 'animate-bounce' : 'animate-pulse'
        }`} />
      </div>
      <div className="absolute top-1/2 -right-6 pointer-events-none">
        <Heart className={`w-4 h-4 text-pink-400 drop-shadow-lg ${
          isAnimating ? 'animate-ping' : 'animate-pulse'
        }`} />
      </div>
    </div>
  );
};
