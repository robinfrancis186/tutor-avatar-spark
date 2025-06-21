
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Brain, Zap, Target, TrendingUp } from 'lucide-react';

interface LearningProfile {
  preferredLearningStyle: string;
  attentionSpan: number;
  difficultyLevel: string;
  responseTime: number;
  engagementLevel: number;
  lastUpdated: Date;
}

export const AdaptiveLearningEngine = () => {
  const [learningProfile,  setLearningProfile] = useState<LearningProfile>({
    preferredLearningStyle: 'Visual-Kinesthetic',
    attentionSpan: 15, // minutes
    difficultyLevel: 'Beginner+',
    responseTime: 8.5, // seconds average
    engagementLevel: 87, // percentage
    lastUpdated: new Date()
  });

  const [adaptations, setAdaptations] = useState([
    {
      type: 'Content Delivery',
      description: 'Switched to visual-first explanations with audio support',
      impact: 'Positive',
      timestamp: '2 minutes ago'
    },
    {
      type: 'Difficulty Adjustment',
      description: 'Reduced complexity based on response patterns',
      impact: 'Positive',
      timestamp: '5 minutes ago'
    },
    {
      type: 'Break Reminder',
      description: 'Suggested 3-minute break after 12 minutes of learning',
      impact: 'Neutral',
      timestamp: '8 minutes ago'
    }
  ]);

  const { toast } = useToast();

  useEffect(() => {
    // Simulate real-time learning analytics
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        simulateAdaptation();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const simulateAdaptation = () => {
    const adaptationTypes = [
      {
        type: 'Pacing Adjustment',
        description: 'Slowed down content delivery based on comprehension signals',
        impact: 'Positive'
      },
      {
        type: 'Modality Switch',
        description: 'Added tactile elements to support kinesthetic learning',
        impact: 'Positive'
      },
      {
        type: 'Emotional Support',
        description: 'Increased encouragement frequency due to frustration indicators',
        impact: 'Positive'
      }
    ];

    const newAdaptation = {
      ...adaptationTypes[Math.floor(Math.random() * adaptationTypes.length)],
      timestamp: 'Just now'
    };

    setAdaptations(prev => [newAdaptation, ...prev.slice(0, 4)]);
    
    // Update learning profile
    setLearningProfile(prev => ({
      ...prev,
      engagementLevel: Math.min(100, prev.engagementLevel + Math.floor(Math.random() * 5)),
      lastUpdated: new Date()
    }));

    toast({
      title: "AI Adaptation Applied",
      description: newAdaptation.description,
    });
  };

  const getEngagementColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <Brain className="w-6 h-6 text-purple-500" />
            Adaptive Learning Intelligence
          </CardTitle>
          <p className="text-sm text-gray-600">
            AI-powered personalization engine continuously adapting to learning needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/60">
              <Target className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="font-bold text-gray-800">{learningProfile.preferredLearningStyle}</div>
              <div className="text-sm text-gray-600">Learning Style</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/60">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="font-bold text-gray-800">{learningProfile.attentionSpan}min</div>
              <div className="text-sm text-gray-600">Attention Span</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/60">
              <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <div className="font-bold text-gray-800">{learningProfile.responseTime}s</div>
              <div className="text-sm text-gray-600">Avg Response</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/60">
              <div className={`text-2xl font-bold ${getEngagementColor(learningProfile.engagementLevel)}`}>
                {learningProfile.engagementLevel}%
              </div>
              <div className="text-sm text-gray-600">Engagement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Real-time Adaptations</CardTitle>
          <p className="text-sm text-gray-600">
            Live adjustments made by the AI to optimize learning experience
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {adaptations.map((adaptation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  adaptation.impact === 'Positive' ? 'bg-green-500' : 
                  adaptation.impact === 'Neutral' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-800">{adaptation.type}</span>
                    <Badge variant={adaptation.impact === 'Positive' ? 'default' : 'secondary'} className="text-xs">
                      {adaptation.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{adaptation.description}</p>
                  <p className="text-xs text-gray-500">{adaptation.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Learning Progress Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Comprehension Level</span>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Retention Rate</span>
              <span className="text-sm text-gray-600">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Confidence Building</span>
              <span className="text-sm text-gray-600">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
