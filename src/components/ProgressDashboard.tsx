
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Clock, Book } from 'lucide-react';

export const ProgressDashboard = () => {
  const progressData = [
    { subject: 'Mathematics', progress: 75, lessonsCompleted: 12, totalLessons: 16 },
    { subject: 'Reading', progress: 60, lessonsCompleted: 9, totalLessons: 15 },
    { subject: 'Science', progress: 45, lessonsCompleted: 6, totalLessons: 14 },
  ];

  const todayStats = {
    timeSpent: '1h 25m',
    lessonsCompleted: 3,
    streak: 7
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Learning Journey</h2>
      
      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-gray-800">{todayStats.timeSpent}</p>
            <p className="text-sm text-gray-600">Time Today</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Book className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-gray-800">{todayStats.lessonsCompleted}</p>
            <p className="text-sm text-gray-600">Lessons Done</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold text-gray-800">{todayStats.streak}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Subject Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {progressData.map((item) => (
            <div key={item.subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{item.subject}</span>
                <span className="text-sm text-gray-500">
                  {item.lessonsCompleted}/{item.totalLessons} lessons
                </span>
              </div>
              <Progress value={item.progress} className="h-2" />
              <p className="text-xs text-gray-500 text-right">{item.progress}% complete</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
