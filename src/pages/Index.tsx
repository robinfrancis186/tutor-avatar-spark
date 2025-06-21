
import React, { useState } from 'react';
import { WelcomeSection } from '@/components/WelcomeSection';
import { SubjectGrid } from '@/components/SubjectGrid';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { TutorChat } from '@/components/TutorChat';
import { AchievementBadges } from '@/components/AchievementBadges';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setActiveSection('tutor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6">
        <WelcomeSection />
        
        {activeSection === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <ProgressDashboard />
            <SubjectGrid onSubjectSelect={handleSubjectSelect} />
            <AchievementBadges />
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
