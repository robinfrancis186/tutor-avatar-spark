
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Users, TrendingUp, Heart, Clock, Book, Star, MessageCircle } from 'lucide-react';

export const CaregiverDashboard = () => {
  const [studentData] = useState({
    name: "Alex",
    age: 12,
    condition: "Autism Spectrum Disorder",
    currentLevel: "Beginner",
    weeklyGoal: 10,
    completedLessons: 7,
    streakDays: 5,
    improvementAreas: ["Social Skills", "Math Concepts", "Reading Comprehension"],
    strongAreas: ["Visual Learning", "Pattern Recognition", "Memory Games"]
  });

  const [weeklyProgress] = useState([
    { day: "Mon", lessons: 2, engagement: 85, mood: "Happy" },
    { day: "Tue", lessons: 1, engagement: 78, mood: "Calm" },
    { day: "Wed", lessons: 2, engagement: 92, mood: "Excited" },
    { day: "Thu", lessons: 1, engagement: 88, mood: "Focused" },
    { day: "Fri", lessons: 1, engagement: 83, mood: "Happy" },
    { day: "Sat", lessons: 0, engagement: 0, mood: "Rest Day" },
    { day: "Sun", lessons: 0, engagement: 0, mood: "Rest Day" }
  ];

  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <Users className="w-6 h-6 text-blue-500" />
            Caregiver Dashboard
          </CardTitle>
          <p className="text-sm text-gray-600">
            Monitor {studentData.name}'s learning progress and emotional well-being
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{studentData.completedLessons}</div>
              <p className="text-sm text-gray-600">Lessons This Week</p>
              <Progress value={(studentData.completedLessons / studentData.weeklyGoal) * 100} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{studentData.streakDays}</div>
              <p className="text-sm text-gray-600">Day Learning Streak</p>
              <div className="flex justify-center mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Great Progress!
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">87%</div>
              <p className="text-sm text-gray-600">Avg. Engagement</p>
              <div className="flex justify-center mt-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  Excellent
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="progress" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="emotional">Emotional</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="communication">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Weekly Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-gray-700">{day.day}</div>
                      <Badge variant={day.lessons > 0 ? "default" : "secondary"}>
                        {day.lessons} lessons
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      {day.engagement > 0 && (
                        <div className="text-sm text-gray-600">
                          {day.engagement}% engaged
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {day.mood}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emotional" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Emotional Well-being Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h3 className="font-medium text-green-800 mb-2">Positive Emotional Indicators</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Shows excitement when learning new concepts</li>
                    <li>• Responds well to encouragement and praise</li>
                    <li>• Demonstrates increased confidence in problem-solving</li>
                    <li>• Maintains focus for longer periods during engaging activities</li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Areas for Emotional Support</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• May need extra encouragement with challenging math problems</li>
                    <li>• Benefits from familiar voice feedback during difficult tasks</li>
                    <li>• Responds better to visual cues than verbal instructions alone</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Strong Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {studentData.strongAreas.map((area, index) => (
                    <div key={index} className="p-2 rounded bg-yellow-50 text-yellow-800 text-sm">
                      {area}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-blue-500" />
                  Growth Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {studentData.improvementAreas.map((area, index) => (
                    <div key={index} className="p-2 rounded bg-blue-50 text-blue-800 text-sm">
                      {area}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-500" />
                Communication & Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <h3 className="font-medium text-purple-800 mb-2">Recent Teacher Notes</h3>
                <p className="text-sm text-purple-700">
                  "Alex showed remarkable improvement in pattern recognition today. 
                  The visual learning tools are really helping with comprehension. 
                  Continue with the current adaptive pace."
                </p>
                <p className="text-xs text-purple-600 mt-2">- Ms. Johnson, Special Education Teacher</p>
              </div>

              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <h3 className="font-medium text-green-800 mb-2">Parent Observations</h3>
                <p className="text-sm text-green-700">
                  "Alex is more excited about learning and often shares what they learned during dinner. 
                  The familiar voice feature has made a huge difference in engagement."
                </p>
                <p className="text-xs text-green-600 mt-2">- Added by Parent</p>
              </div>

              <Button 
                className="w-full hover-scale"
                onClick={() => {
                  toast({
                    title: "Communication Hub",
                    description: "Feature coming soon - direct messaging with teachers and caregivers!",
                  });
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message to Teacher
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
