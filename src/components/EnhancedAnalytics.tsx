
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Brain, Clock, Star, AlertTriangle, Download, Calendar, Users } from 'lucide-react';

export const EnhancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedStudent, setSelectedStudent] = useState('alex');

  const [analyticsData] = useState({
    learningMetrics: [
      { date: '2024-01-15', engagement: 85, comprehension: 78, completion: 92, mood: 8 },
      { date: '2024-01-16', engagement: 88, comprehension: 82, completion: 95, mood: 9 },
      { date: '2024-01-17', engagement: 92, comprehension: 85, completion: 98, mood: 9 },
      { date: '2024-01-18', engagement: 87, comprehension: 80, completion: 90, mood: 7 },
      { date: '2024-01-19', engagement: 90, comprehension: 88, completion: 96, mood: 9 },
    ],
    skillProgress: [
      { skill: 'Reading', current: 75, target: 85, improvement: 12 },
      { skill: 'Math', current: 68, target: 80, improvement: 15 },
      { skill: 'Science', current: 82, target: 90, improvement: 8 },
      { skill: 'Social Skills', current: 60, target: 75, improvement: 20 },
      { skill: 'Problem Solving', current: 78, target: 85, improvement: 10 }
    ],
    behaviorPatterns: [
      { time: '9:00', focus: 85, activity: 'Math', mood: 'Focused' },
      { time: '10:00', focus: 78, activity: 'Reading', mood: 'Engaged' },
      { time: '11:00', focus: 92, activity: 'Science', mood: 'Excited' },
      { time: '14:00', focus: 65, activity: 'Social Skills', mood: 'Tired' },
      { time: '15:00', focus: 80, activity: 'Games', mood: 'Happy' },
    ],
    interventionData: [
      { name: 'Visual Aids', value: 35, color: '#8884d8' },
      { name: 'Voice Support', value: 25, color: '#82ca9d' },
      { name: 'Extra Time', value: 20, color: '#ffc658' },
      { name: 'Simplified Tasks', value: 15, color: '#ff7c7c' },
      { name: 'Peer Support', value: 5, color: '#8dd1e1' }
    ]
  });

  const { toast } = useToast();

  const generateReport = () => {
    toast({
      title: "Comprehensive Report Generated! 📊",
      description: "Detailed analytics report has been prepared for download.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <BarChart className="w-6 h-6 text-blue-500" />
              Enhanced Learning Analytics & Insights
            </CardTitle>
            <div className="flex gap-2">
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alex">Alex</SelectItem>
                  <SelectItem value="jordan">Jordan</SelectItem>
                  <SelectItem value="casey">Casey</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Comprehensive data-driven insights for personalized learning support
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="learning">Learning Patterns</TabsTrigger>
          <TabsTrigger value="behavior">Behavior Analysis</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="predictions">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">87%</p>
                    <p className="text-sm text-gray-600">Avg Engagement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">94%</p>
                    <p className="text-sm text-gray-600">Goal Achievement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Brain className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold text-purple-600">83%</p>
                    <p className="text-sm text-gray-600">Comprehension</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">8.4</p>
                    <p className="text-sm text-gray-600">Mood Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Skill Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.skillProgress.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.skill}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{skill.current}%</span>
                          <Badge variant="secondary" className="text-xs">
                            +{skill.improvement}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={skill.current} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Current: {skill.current}%</span>
                        <span>Target: {skill.target}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Weekly Learning Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.learningMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="engagement" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="comprehension" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="completion" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Learning Pattern Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.behaviorPatterns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="focus" fill="#8884d8" name="Focus Level %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Peak Learning Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Best Performance</h4>
                    <p className="text-sm text-green-700">11:00 AM - Highest focus (92%)</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Needs Support</h4>
                    <p className="text-sm text-yellow-700">2:00 PM - Lower focus (65%)</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Recommendation</h4>
                    <p className="text-sm text-blue-700">Schedule complex tasks before lunch</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Subject Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="text-sm font-medium">Science</span>
                    <Badge variant="secondary">High Engagement</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="text-sm font-medium">Math</span>
                    <Badge variant="secondary">Improving</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                    <span className="text-sm font-medium">Reading</span>
                    <Badge variant="secondary">Steady Progress</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                    <span className="text-sm font-medium">Social Skills</span>
                    <Badge variant="secondary">Needs Support</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Emotional Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Positive Triggers</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Interactive visual content (+15% engagement)</li>
                      <li>• Success celebrations (+12% mood)</li>
                      <li>• Collaborative activities (+10% motivation)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Challenge Areas</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Complex instructions (-8% comprehension)</li>
                      <li>• Time pressure (-12% performance)</li>
                      <li>• Large group settings (-6% participation)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Attention Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Focus Duration</span>
                    <Badge variant="outline">12 minutes</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Optimal Break Frequency</span>
                    <Badge variant="outline">Every 15 min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Distraction Recovery Time</span>
                    <Badge variant="outline">3 minutes</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Peak Attention Window</span>
                    <Badge variant="outline">10-12 AM</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Intervention Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.interventionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.interventionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">High Priority</h4>
                        <p className="text-sm text-blue-700">Increase visual support for math concepts</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">Opportunity</h4>
                        <p className="text-sm text-green-700">Leverage science interest for cross-subject learning</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-purple-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-800">Schedule</h4>
                        <p className="text-sm text-purple-700">Adjust afternoon break timing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">AI-Powered Insights & Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Learning Trajectory</h4>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Predicted Progress:</strong> At current pace, Alex will achieve 
                      reading goals 2 weeks ahead of schedule.
                    </p>
                    <Progress value={78} className="mb-2" />
                    <p className="text-xs text-gray-600">Confidence: 87%</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Opportunity Identified:</strong> Strong visual learning preference 
                      suggests STEM subjects will show accelerated progress.
                    </p>
                    <Badge variant="secondary">Actionable Insight</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Risk Assessment</h4>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800 mb-2">
                      <strong>Attention Alert:</strong> Afternoon focus decline detected. 
                      Consider shorter sessions or energy breaks.
                    </p>
                    <Badge variant="outline" className="text-yellow-700">Low Risk</Badge>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 mb-2">
                      <strong>Strength Leverage:</strong> Pattern recognition skills can 
                      accelerate math concept mastery.
                    </p>
                    <Badge variant="outline" className="text-green-700">High Potential</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2">
        <Button className="hover-scale" onClick={generateReport}>
          <Download className="w-4 h-4 mr-2" />
          Generate Comprehensive Report
        </Button>
        <Button variant="outline" className="hover-scale" onClick={() => {
          toast({
            title: "Meeting Scheduled!",
            description: "IEP review meeting has been scheduled for next week.",
          });
        }}>
          <Calendar className="w-4 h-4 mr-2" />
          Schedule IEP Review
        </Button>
        <Button variant="outline" className="hover-scale" onClick={() => {
          toast({
            title: "Collaboration Invited!",
            description: "Team members have been notified for collaborative planning.",
          });
        }}>
          <Users className="w-4 h-4 mr-2" />
          Invite Collaboration
        </Button>
      </div>
    </div>
  );
};
