
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Gift, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type EarnedAchievement = {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: true;
  date: string;
  points: number;
  rarity: string;
};

type UnearnedAchievement = {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: false;
  progress: string;
  points: number;
  rarity: string;
};

type Achievement = EarnedAchievement | UnearnedAchievement;

export const AchievementBadges = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: 'First Step',
      description: 'Completed your first lesson',
      icon: '🎯',
      earned: true,
      date: '2 days ago',
      points: 10,
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Learned for 7 days in a row',
      icon: '🔥',
      earned: true,
      date: 'Yesterday',
      points: 50,
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Math Master',
      description: 'Completed 10 math lessons',
      icon: '🧮',
      earned: false,
      progress: '8/10',
      points: 75,
      rarity: 'epic'
    },
    {
      id: 4,
      title: 'Reading Star',
      description: 'Read 5 stories',
      icon: '📖',
      earned: false,
      progress: '3/5',
      points: 30,
      rarity: 'uncommon'
    },
    {
      id: 5,
      title: 'Science Explorer',
      description: 'Discover 20 science facts',
      icon: '🔬',
      earned: false,
      progress: '12/20',
      points: 60,
      rarity: 'rare'
    },
    {
      id: 6,
      title: 'Quiz Champion',
      description: 'Get 100% on 5 quizzes',
      icon: '🏆',
      earned: false,
      progress: '2/5',
      points: 100,
      rarity: 'legendary'
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(60);
  const [showNewAchievement, setShowNewAchievement] = useState(false);
  const { toast } = useToast();

  // Simulate achievement progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        simulateProgress();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const simulateProgress = () => {
    setAchievements(prev => 
      prev.map(achievement => {
        if (!achievement.earned && Math.random() > 0.5) {
          const unearnedAchievement = achievement as UnearnedAchievement;
          const [current, total] = unearnedAchievement.progress.split('/').map(Number);
          const newCurrent = Math.min(total, current + 1);
          const newProgress = `${newCurrent}/${total}`;
          
          if (newCurrent === total) {
            // Achievement unlocked!
            setTimeout(() => {
              unlockAchievement(achievement.id);
            }, 1000);
          }
          
          return { 
            ...unearnedAchievement, 
            progress: newProgress 
          } as UnearnedAchievement;
        }
        return achievement;
      })
    );
  };

  const unlockAchievement = (id: number) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id 
          ? { 
              id: achievement.id,
              title: achievement.title,
              description: achievement.description,
              icon: achievement.icon,
              earned: true,
              date: 'Just now!',
              points: achievement.points,
              rarity: achievement.rarity
            } as EarnedAchievement
          : achievement
      )
    );

    const unlockedAchievement = achievements.find(a => a.id === id);
    if (unlockedAchievement) {
      setTotalPoints(prev => prev + unlockedAchievement.points);
      setShowNewAchievement(true);
      
      toast({
        title: "🎉 Achievement Unlocked!",
        description: `${unlockedAchievement.title} - ${unlockedAchievement.description}`,
      });

      setTimeout(() => setShowNewAchievement(false), 3000);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'uncommon': return 'border-green-300 bg-green-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600';
      case 'uncommon': return 'text-green-600';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-purple-600';
      case 'legendary': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <div className="space-y-6">
      {showNewAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <Card className="border-2 border-yellow-400 bg-yellow-50 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🎉</div>
              <p className="font-bold text-yellow-800">New Achievement!</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <Star className="w-6 h-6 text-yellow-500" />
              Your Achievements
            </CardTitle>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Points</div>
              <div className="text-lg font-bold text-purple-600 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                {totalPoints}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">
              {earnedCount} of {achievements.length} achievements unlocked
            </span>
            <div className="text-sm text-green-600 font-medium">
              {Math.round((earnedCount / achievements.length) * 100)}% Complete
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover-scale ${
                  achievement.earned
                    ? `${getRarityColor(achievement.rarity)} border-opacity-100`
                    : 'border-gray-200 bg-gray-50 opacity-75'
                } ${achievement.earned ? 'animate-pulse' : ''}`}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className={`font-semibold ${
                    achievement.earned 
                      ? getRarityTextColor(achievement.rarity) 
                      : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {achievement.description}
                  </p>
                  
                  {achievement.earned ? (
                    <div className="space-y-1">
                      <p className="text-xs text-green-600 font-medium">
                        ✅ Earned {achievement.date}
                      </p>
                      <div className="flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 text-purple-500" />
                        <span className="text-xs text-purple-600 font-medium">
                          +{achievement.points} points
                        </span>
                      </div>
                      <div className={`text-xs font-medium ${getRarityTextColor(achievement.rarity)} capitalize`}>
                        {achievement.rarity}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">
                        Progress: {(achievement as UnearnedAchievement).progress}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" 
                          style={{
                            width: `${(parseInt((achievement as UnearnedAchievement).progress.split('/')[0]) / parseInt((achievement as UnearnedAchievement).progress.split('/')[1])) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-purple-600">
                        Reward: {achievement.points} points
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              className="hover-scale"
              onClick={() => {
                toast({
                  title: "Keep Learning! 📚",
                  description: "Complete more lessons to unlock achievements!",
                });
              }}
            >
              <Gift className="w-4 h-4 mr-2" />
              View Rewards Store
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
