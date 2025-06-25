
import React, { useState } from 'react';
import { WelcomeSection } from '@/components/WelcomeSection';
import { SubjectGrid } from '@/components/SubjectGrid';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { TutorChat } from '@/components/TutorChat';
import { AchievementBadges } from '@/components/AchievementBadges';
import { AccessibilitySettings } from '@/components/AccessibilitySettings';
import { EnhancedAccessibilitySettings } from '@/components/EnhancedAccessibilitySettings';
import { CaregiverDashboard } from '@/components/CaregiverDashboard';
import { AdaptiveLearningEngine } from '@/components/AdaptiveLearningEngine';
import { EnhancedAnalytics } from '@/components/EnhancedAnalytics';
import { InteractiveLearningElements } from '@/components/InteractiveLearningElements';
import { AiTutorAvatar } from '@/components/AiTutorAvatar';
import { ProfessionalHeader } from '@/components/ProfessionalHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setActiveSection('tutor');
  };

  const handleAvatarInteraction = (message: string) => {
    console.log('AI Tutor says:', message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Professional Header */}
      <ProfessionalHeader />
      
      {/* AI Tutor Avatar - More professional positioning */}
      <AiTutorAvatar 
        currentSubject={selectedSubject || 'general learning'}
        studentName="Alex"
        onInteraction={handleAvatarInteraction}
      />

      <div className="container mx-auto px-6 py-8 ml-20 max-w-7xl">
        {/* Professional Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
            Empowering Neurodivergent Students
          </h1>
          <p className="text-xl text-slate-600 mb-2 font-medium">
            Through Storytelling and Advocacy
          </p>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Personalized learning experiences designed to celebrate diverse minds and unlock every student's potential
          </p>
        </div>
        
        {activeSection === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <Tabs defaultValue="learning" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm border border-slate-200 rounded-xl p-1 mb-8">
                <TabsTrigger 
                  value="learning" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium rounded-lg transition-all duration-200"
                >
                  Learning Hub
                </TabsTrigger>
                <TabsTrigger 
                  value="interactive" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium rounded-lg transition-all duration-200"
                >
                  Interactive Tools
                </TabsTrigger>
                <TabsTrigger 
                  value="progress" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium rounded-lg transition-all duration-200"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="adaptive" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium rounded-lg transition-all duration-200"
                >
                  AI Engine
                </TabsTrigger>
                <TabsTrigger 
                  value="accessibility" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium rounded-lg transition-all duration-200"
                >
                  Accessibility
                </TabsTrigger>
                <TabsTrigger 
                  value="caregiver" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium rounded-lg transition-all duration-200"
                >
                  Caregiver Portal
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="learning" className="space-y-8 mt-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                  <ProgressDashboard />
                </div>
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                  <SubjectGrid onSubjectSelect={handleSubjectSelect} />
                </div>
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                  <AchievementBadges />
                </div>
              </TabsContent>

              <TabsContent value="interactive" className="space-y-8 mt-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                  <InteractiveLearningElements />
                </div>
              </TabsContent>
              
              <TabsContent value="progress" className="space-y-8 mt-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                  <EnhancedAnalytics />
                </div>
              </TabsContent>
              
              <TabsContent value="adaptive" className="space-y-8 mt-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                  <AdaptiveLearningEngine />
                </div>
              </TabsContent>
              
              <TabsContent value="accessibility" className="space-y-8 mt-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                  <EnhancedAccessibilitySettings />
                </div>
              </TabsContent>
              
              <TabsContent value="caregiver" className="space-y-8 mt-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                  <CaregiverDashboard />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'tutor' && selectedSubject && (
          <div className="animate-fade-in bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <TutorChat 
              subject={selectedSubject} 
              onBack={() => setActiveSection('dashboard')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
