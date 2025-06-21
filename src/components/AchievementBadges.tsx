
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { star } from 'lucide-react';

export const AchievementBadges = () => {
  const achievements = [
    {
      id: 1,
      title: 'First Lesson',
      description: 'Completed your first lesson',
      icon: '🎯',
      earned: true,
      date: '2 days ago'
    },
    {
      id: 2,
      title: 'Week Streak',
      description: 'Learned for 7 days in a row',
      icon: '🔥',
      earned: true,
      date: 'Yesterday'
    },
    {
      id: 3,
      title: 'Math Master',
      description: 'Completed 10 math lessons',
      icon: '🧮',
      earned: false,
      progress: '8/10'
    },
    {
      id: 4,
      title: 'Reading Star',
      description: 'Read 5 stories',
      icon: '📖',
      earned: false,
      progress: '3/5'
    }
  ];

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
          <star className="w-6 h-6 text-yellow-500" />
          Your Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.earned
                  ? 'border-green-200 bg-green-50 hover-scale'
                  : 'border-gray-200 bg-gray-50 opacity-75'
              }`}
            >
              <div className="text-center space-y-2">
                <div className="text-3xl">{achievement.icon}</div>
                <h3 className={`font-semibold ${
                  achievement.earned ? 'text-green-800' : 'text-gray-600'
                }`}>
                  {achievement.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {achievement.description}
                </p>
                {achievement.earned ? (
                  <p className="text-xs text-green-600 font-medium">
                    Earned {achievement.date}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Progress: {achievement.progress}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
