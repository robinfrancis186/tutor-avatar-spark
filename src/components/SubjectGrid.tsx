
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Gamepad, Star } from 'lucide-react';

interface SubjectGridProps {
  onSubjectSelect: (subject: string) => void;
}

export const SubjectGrid = ({ onSubjectSelect }: SubjectGridProps) => {
  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
      icon: Star,
      color: 'from-green-400 to-emerald-500',
      description: 'Numbers, patterns, and problem solving',
      level: 'Beginner'
    },
    {
      id: 'reading',
      name: 'Reading',
      icon: Book,
      color: 'from-blue-400 to-cyan-500',
      description: 'Stories, comprehension, and vocabulary',
      level: 'Intermediate'
    },
    {
      id: 'science',
      name: 'Science',
      icon: Star,
      color: 'from-purple-400 to-pink-500',
      description: 'Explore the world around us',
      level: 'Beginner'
    },
    {
      id: 'games',
      name: 'Learning Games',
      icon: Gamepad,
      color: 'from-orange-400 to-red-500',
      description: 'Fun activities and challenges',
      level: 'All Levels'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Subject</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <Card 
              key={subject.id}
              className="hover-scale cursor-pointer transition-all duration-300 hover:shadow-xl border-0 overflow-hidden"
              onClick={() => onSubjectSelect(subject.id)}
            >
              <CardHeader className={`bg-gradient-to-r ${subject.color} text-white p-4`}>
                <div className="flex items-center justify-between">
                  <Icon className="w-8 h-8" />
                  <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                    {subject.level}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 text-gray-800">
                  {subject.name}
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  {subject.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
