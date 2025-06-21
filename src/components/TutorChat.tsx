
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, MessageCircle } from 'lucide-react';

interface TutorChatProps {
  subject: string;
  onBack: () => void;
}

export const TutorChat = ({ subject, onBack }: TutorChatProps) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'tutor',
      text: `Hi! I'm your ${subject} tutor. I'm here to help you learn at your own pace. What would you like to explore today?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'student',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate tutor response
    setTimeout(() => {
      const tutorResponse = {
        id: messages.length + 2,
        sender: 'tutor',
        text: "That's a great question! Let me explain this step by step to make it easier to understand...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, tutorResponse]);
    }, 1000);
  };

  const quickQuestions = [
    "Can you explain this again?",
    "Show me an example",
    "I need help with homework",
    "Let's play a game!"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 capitalize">{subject} Tutor</h1>
        <div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Your Personal Tutor
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
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'student'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    } animate-fade-in`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-4">
              <div className="flex gap-2 mb-3">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setInputValue(question)}
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
                />
                <Button onClick={handleSendMessage}>
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar with tools and features */}
        <div className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Learning Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                📝 Practice Quiz
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🎮 Learning Game
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📚 Lesson Summary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                💡 Hints & Tips
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Progress Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl">🎯</div>
                <p className="font-semibold">Great job!</p>
                <p className="text-sm text-gray-600">
                  You've been learning for 25 minutes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
