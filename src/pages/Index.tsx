
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* AI Tutor Avatar - Fixed positioned on the left */}
      <AiTutorAvatar 
        currentSubject={selectedSubject || 'general learning'}
        studentName="Alex"
        onInteraction={handleAvatarInteraction}
      />

      <div className="container mx-auto px-4 py-6 ml-16"> {/* Added left margin to accommodate avatar */}
        <WelcomeSection />
        
        {activeSection === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <Tabs defaultValue="learning" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="learning">Learning</TabsTrigger>
                <TabsTrigger value="interactive">Interactive</TabsTrigger>
                <TabsTrigger value="progress">Analytics</TabsTrigger>
                <TabsTrigger value="adaptive">AI Engine</TabsTrigger>
                <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                <TabsTrigger value="caregiver">Caregiver</TabsTrigger>
              </TabsList>
              
              <TabsContent value="learning" className="space-y-8 mt-6">
                <ProgressDashboard />
                <SubjectGrid onSubjectSelect={handleSubjectSelect} />
                <AchievementBadges />
              </TabsContent>

              <TabsContent value="interactive" className="space-y-8 mt-6">
                <InteractiveLearningElements />
              </TabsContent>
              
              <TabsContent value="progress" className="space-y-8 mt-6">
                <EnhancedAnalytics />
              </TabsContent>
              
              <TabsContent value="adaptive" className="space-y-8 mt-6">
                <AdaptiveLearningEngine />
              </TabsContent>
              
              <TabsContent value="accessibility" className="space-y-8 mt-6">
                <EnhancedAccessibilitySettings />
              </TabsContent>
              
              <TabsContent value="caregiver" className="space-y-8 mt-6">
                <CaregiverDashboard />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'tutor' && selectedSubject && (
          <div className="animate-fade-in">
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
