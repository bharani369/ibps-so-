import React, { useState } from 'react';
import { PenSquare } from 'lucide-react';
import { QuickNotesModal } from './QuickNotesModal';
import { AnimatePresence } from 'motion/react';

export function FloatingActionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 md:bottom-8 right-6 z-40 p-4 rounded-full bg-neon-purple text-gray-900 shadow-lg shadow-neon-purple/20 hover:bg-neon-purple/90 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="Quick Notes"
      >
        <PenSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isModalOpen && <QuickNotesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
