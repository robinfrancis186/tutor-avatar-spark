
import React, { useState, useEffect } from 'react';
import { user } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const WelcomeSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const studentName = "Alex"; // This would come from user data

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Card className="p-6 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <user className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2 animate-fade-in">
            {getGreeting()}, {studentName}! 🌟
          </h1>
          <p className="text-blue-100 text-lg">
            Ready to learn something amazing today? Your personal tutor is here to help!
          </p>
        </div>
        <div className="text-right">
          <p className="text-blue-100 text-sm">
            {currentTime.toLocaleDateString()}
          </p>
          <p className="text-white text-lg font-semibold">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </Card>
  );
};
