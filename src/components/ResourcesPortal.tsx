import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { Download, FileText, Youtube } from 'lucide-react';

export function ResourcesPortal() {
  const resources = [
    { id: 1, title: 'IBPS SO IT Officer Previous Year Paper 2023', type: 'PDF', icon: <FileText className="w-6 h-6 text-red-400" />, url: '#' },
    { id: 2, title: 'IBPS SO IT Officer Previous Year Paper 2022', type: 'PDF', icon: <FileText className="w-6 h-6 text-red-400" />, url: '#' },
    { id: 3, title: 'Top 100 DBMS Questions for Mains', type: 'PDF', icon: <FileText className="w-6 h-6 text-red-400" />, url: '#' },
    { id: 4, title: 'Networking Fundamentals Cheat Sheet', type: 'Notes', icon: <Download className="w-6 h-6 text-neon-green" />, url: 'https://www.geeksforgeeks.org/computer-network-tutorials/' },
    { id: 5, title: 'Software Engineering SDLC Mindmap', type: 'Notes', icon: <Download className="w-6 h-6 text-neon-green" />, url: 'https://www.geeksforgeeks.org/software-engineering/' },
    { id: 6, title: 'Complete Banking Awareness (Prelims)', type: 'Video', icon: <Youtube className="w-6 h-6 text-red-500" />, url: 'https://www.youtube.com/results?search_query=banking+awareness+playlist' },
    { id: 7, title: '120 Rules of Grammar by Nimisha Bansal', type: 'Video', icon: <Youtube className="w-6 h-6 text-red-500" />, url: 'https://www.youtube.com/results?search_query=120+rules+of+grammar+nimisha+bansal' },
    { id: 8, title: 'Important Operating System Algorithms', type: 'Notes', icon: <Download className="w-6 h-6 text-neon-green" />, url: 'https://www.geeksforgeeks.org/operating-systems/' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-blue-400">
          Study Resources
        </h1>
        <p className="text-gray-400 mt-2">Download PDFs, notes, and access curated video playlists.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((res) => (
          <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="block outline-none">
            <GlassCard className="group hover:border-white/20 transition-colors cursor-pointer flex flex-col items-center text-center p-6 h-full">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {res.icon}
              </div>
              <h3 className="text-sm font-medium mb-2">{res.title}</h3>
              <span className="text-xs text-gray-500 uppercase tracking-wider">{res.type}</span>
            </GlassCard>
          </a>
        ))}
      </div>
    </div>
  );
}
