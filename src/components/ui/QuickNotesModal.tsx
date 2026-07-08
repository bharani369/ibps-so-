import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { X, Plus, Trash2 } from 'lucide-react';
import { useProgressStore } from '../../store/useProgress';
import { motion } from 'motion/react';

interface QuickNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickNotesModal({ isOpen, onClose }: QuickNotesModalProps) {
  const [newNote, setNewNote] = useState('');
  const notes = useProgressStore((state) => state.progress.notes) || [];
  const addNote = useProgressStore((state) => state.addNote);
  const deleteNote = useProgressStore((state) => state.deleteNote);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      addNote(newNote.trim());
      setNewNote('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md"
      >
        <GlassCard className="flex flex-col h-[500px] max-h-[80vh] border-neon-purple/30 bg-gray-900/95 shadow-2xl shadow-neon-purple/20">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10 shrink-0">
            <h2 className="text-xl font-bold text-white">Quick Notes</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 custom-scrollbar">
            {notes.length === 0 ? (
              <p className="text-gray-400 text-center text-sm italic py-8">No notes yet. Start typing below!</p>
            ) : (
              notes.map(note => (
                <div key={note.id} className="p-3 rounded-lg bg-white/5 border border-white/10 group relative">
                  <p className="text-sm text-gray-200 pr-6 break-words">{note.text}</p>
                  <p className="text-[10px] text-gray-500 mt-2">
                    {new Date(note.date).toLocaleString()}
                  </p>
                  <button 
                    onClick={() => deleteNote(note.id)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAdd} className="mt-auto relative shrink-0">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Type a note..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
            />
            <button
              type="submit"
              disabled={!newNote.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4 font-bold" />
            </button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
