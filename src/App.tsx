import React, { useState, useEffect } from 'react';
import { HomeDashboard } from './components/HomeDashboard';
import { PrelimsPortal } from './components/PrelimsPortal';
import { MainsPortal } from './components/MainsPortal';
import { MockTestsPortal } from './components/MockTestsPortal';
import { ResourcesPortal } from './components/ResourcesPortal';
import { Onboarding } from './components/Onboarding';
import { Home, BookOpen, GraduationCap, FileText, MonitorPlay } from 'lucide-react';
import { cn } from './lib/utils';
import { useProgress, useProgressStore } from './store/useProgress';
import { FloatingActionButton } from './components/ui/FloatingActionButton';

type Tab = 'home' | 'prelims' | 'mains' | 'resources' | 'mocks';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { progress, setUserProfile } = useProgress();

  useEffect(() => {
    useProgressStore.getState().checkStreak();
  }, []);

  if (!progress.userProfile) {
    return <Onboarding onComplete={setUserProfile} />;
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-white pb-24 md:pb-0 md:pl-24">
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col items-center py-8 gap-6 fixed left-0 top-0 bottom-0 w-24 border-r border-white/5 bg-black/50 backdrop-blur-xl z-50">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center font-bold text-lg mb-4 shadow-[0_0_20px_rgba(188,19,254,0.4)]">
          SO
        </div>
        
        <NavButton icon={<Home />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavButton icon={<BookOpen />} label="Prelims" active={activeTab === 'prelims'} onClick={() => setActiveTab('prelims')} />
        <NavButton icon={<GraduationCap />} label="Mains" active={activeTab === 'mains'} onClick={() => setActiveTab('mains')} />
        <NavButton icon={<FileText />} label="Resources" active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} />
        <NavButton icon={<MonitorPlay />} label="Mocks" active={activeTab === 'mocks'} onClick={() => setActiveTab('mocks')} />
      </nav>

      {/* Mobile Sticky Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around z-50 px-2 overflow-x-auto hide-scrollbar">
        <MobileNavButton icon={<Home />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <MobileNavButton icon={<BookOpen />} label="Prelims" active={activeTab === 'prelims'} onClick={() => setActiveTab('prelims')} />
        <MobileNavButton icon={<GraduationCap />} label="Mains" active={activeTab === 'mains'} onClick={() => setActiveTab('mains')} />
        <MobileNavButton icon={<FileText />} label="Resources" active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} />
        <MobileNavButton icon={<MonitorPlay />} label="Mocks" active={activeTab === 'mocks'} onClick={() => setActiveTab('mocks')} />
      </nav>

      {/* Main Content Area */}
      <main className="p-6 md:p-10 min-h-screen">
        {activeTab === 'home' && <HomeDashboard />}
        {activeTab === 'prelims' && <PrelimsPortal />}
        {activeTab === 'mains' && <MainsPortal />}
        {activeTab === 'resources' && <ResourcesPortal />}
        {activeTab === 'mocks' && <MockTestsPortal />}
      </main>

      <FloatingActionButton />
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300",
        active ? "text-white bg-white/10" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
      )}
      title={label}
    >
      {active && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 blur-md -z-10" />
      )}
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
      <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute top-full mt-2 bg-black/90 px-2 py-1 rounded">
        {label}
      </span>
    </button>
  );
}

function MobileNavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all duration-300 p-2 min-w-[64px]",
        active ? "text-neon-blue" : "text-gray-500"
      )}
    >
      {React.cloneElement(icon as React.ReactElement, { className: cn("w-5 h-5", active && "drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]") })}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
