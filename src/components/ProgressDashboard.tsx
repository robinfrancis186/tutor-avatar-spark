
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Star, Clock, Book, TrendingUp, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ProgressDashboard = () => {
  const [progressData, setProgressData] = useState([
    { subject: 'Mathematics', progress: 75, lessonsCompleted: 12, totalLessons: 16, recentActivity: true },
    { subject: 'Reading', progress: 60, lessonsCompleted: 9, totalLessons: 15, recentActivity: false },
    { subject: 'Science', progress: 45, lessonsCompleted: 6, totalLessons: 14, recentActivity: true },
  ]);

  const [todayStats, setTodayStats] = useState({
    timeSpent: '1h 25m',
    lessonsCompleted: 3,
    streak: 7,
    pointsEarned: 150
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressData(prev => prev.map(item => ({
        ...item,
        recentActivity: Math.random() > 0.7
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleProgressBoost = (subject: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setProgressData(prev => 
        prev.map(item => 
          item.subject === subject 
            ? { 
                ...item, 
                progress: Math.min(100, item.progress + Math.floor(Math.random() * 10) + 5),
                lessonsCompleted: item.lessonsCompleted + 1,
                recentActivity: true
              }
            : item
        )
      );
      
      setTodayStats(prev => ({
        ...prev,
        lessonsCompleted: prev.lessonsCompleted + 1,
        pointsEarned: prev.pointsEarned + 25
      }));

      setIsLoading(false);
      
      toast({
        title: "Progress Updated! 🎉",
        description: `Great work in ${subject}! Keep learning!`,
      });
    }, 1500);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return 'from-green-400 to-green-600';
    if (progress >= 60) return 'from-blue-400 to-blue-600';
    if (progress >= 40) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Your Learning Journey</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4" />
          <span>Live Updates</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Enhanced Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md hover-scale transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-gray-800">{todayStats.timeSpent}</p>
            <p className="text-sm text-gray-600">Time Today</p>
            <div className="mt-2 text-xs text-blue-600">🔥 On fire!</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md hover-scale transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Book className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-gray-800">{todayStats.lessonsCompleted}</p>
            <p className="text-sm text-gray-600">Lessons Done</p>
            <div className="mt-2 text-xs text-green-600">+1 from yesterday</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md hover-scale transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold text-gray-800">{todayStats.streak}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
            <div className="mt-2 text-xs text-orange-600">New record!</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover-scale transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-gray-800">{todayStats.pointsEarned}</p>
            <p className="text-sm text-gray-600">Points Earned</p>
            <div className="mt-2 text-xs text-purple-600">🎯 Amazing!</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Subject Progress */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            Subject Progress
            <div className="flex-1"></div>
            <Button 
              variant="outline" 
              size="sm"
              disabled={isLoading}
              onClick={() => {
                const randomSubject = progressData[Math.floor(Math.random() * progressData.length)].subject;
                handleProgressBoost(randomSubject);
              }}
              className="hover-scale"
            >
              {isLoading ? 'Updating...' : '🚀 Quick Study'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {progressData.map((item) => (
            <div key={item.subject} className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white border hover-scale transition-all duration-300">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-700">{item.subject}</span>
                  {item.recentActivity && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full animate-pulse">
                      Active Now
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {item.lessonsCompleted}/{item.totalLessons} lessons
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleProgressBoost(item.subject)}
                    disabled={isLoading}
                    className="hover-scale"
                  >
                    Study Now
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <Progress value={item.progress} className="h-3" />
                <div className={`absolute inset-0 bg-gradient-to-r ${getProgressBgColor(item.progress)} rounded-full opacity-20`}></div>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className={`font-medium ${getProgressColor(item.progress)}`}>
                  {item.progress}% complete
                </span>
                <span className="text-gray-400">
                  {item.totalLessons - item.lessonsCompleted} lessons remaining
                </span>
              </div>

              {item.progress >= 80 && (
                <div className="text-center">
                  <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    🏆 Almost Complete! You're doing amazing!
                  </span>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Weekly Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Complete 15 lessons this week</span>
              <span className="text-sm text-gray-600">11/15</span>
            </div>
            <Progress value={73} className="h-2" />
            <p className="text-xs text-gray-600 text-center">
              You're 73% towards your weekly goal! 🎯 Just 4 more lessons to go!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
