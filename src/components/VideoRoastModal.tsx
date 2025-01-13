'use client';

import { useState } from 'react';
import { Button } from './ui/button';

interface VideoRoastOption {
  id: string;
  title: string;
  price: number;
  description: string;
  isPrivate: boolean;
}

interface VideoRoastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: VideoRoastOption) => void;
}

const roastOptions: VideoRoastOption[] = [
  {
    id: 'public',
    title: 'Public Video Roast',
    price: 200,
    description: '15-20 minute video roast, publicly visible in community',
    isPrivate: false,
  },
  {
    id: 'private',
    title: 'Private Video Roast',
    price: 550,
    description: '15-20 minute video roast, kept private and delivered via DM',
    isPrivate: true,
  }
];

export function VideoRoastModal({ isOpen, onClose, onSelect }: VideoRoastModalProps) {
  const [selectedOption, setSelectedOption] = useState<VideoRoastOption | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Request Expert Review</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {roastOptions.map((option) => (
            <div
              key={option.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedOption?.id === option.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-purple-500/50'
              }`}
              onClick={() => setSelectedOption(option)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                <span className="text-xl font-bold text-purple-400">${option.price}</span>
              </div>
              <p className="text-gray-400">{option.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={() => selectedOption && onSelect(selectedOption)}
            disabled={!selectedOption}
          >
            Continue with {selectedOption?.title}
          </Button>
        </div>
      </div>
    </div>
  );
} 