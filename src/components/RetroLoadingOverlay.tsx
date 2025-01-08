'use client';

import { useState, useEffect } from 'react';

const quips = [
  "Teaching AI to make coffee...",
  "Downloading more RAM...",
  "Consulting with the robot council...",
  "Calculating the meaning of life...",
  "Debugging quantum fluctuations...",
  "Reticulating splines...",
  "Converting caffeine to code...",
  "Warming up the flux capacitor...",
  "Feeding the AI hamsters...",
  "Optimizing neural pathways..."
];

interface RetroLoadingOverlayProps {
  isLoading?: boolean;
  isSuccess?: boolean;
}

export function RetroLoadingOverlay({ isLoading = false, isSuccess = false }: RetroLoadingOverlayProps) {
  const [currentQuip, setCurrentQuip] = useState(quips[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuip(quips[Math.floor(Math.random() * quips.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Retro Computer SVG Animation */}
        <div className="mb-8">
          {isSuccess ? (
            <div className="w-32 h-32 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
              <svg
                className="w-20 h-20 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    from="0 100"
                    to="100 100"
                    dur="1s"
                    fill="freeze"
                  />
                </path>
              </svg>
            </div>
          ) : (
            <svg
              className="w-32 h-32 mx-auto"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Monitor */}
              <rect
                x="20"
                y="20"
                width="60"
                height="45"
                rx="2"
                className="stroke-purple-500"
                strokeWidth="3"
                fill="none"
              >
                <animate
                  attributeName="stroke"
                  values="#7C3AED;#9F7AEA;#7C3AED"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
              
              {/* Screen */}
              <rect
                x="25"
                y="25"
                width="50"
                height="35"
                className="fill-gray-800"
              />
              
              {/* Loading Bar */}
              <rect
                x="30"
                y="40"
                width="40"
                height="5"
                className="fill-purple-500"
              >
                <animate
                  attributeName="width"
                  values="0;40"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </rect>
              
              {/* Stand */}
              <path
                d="M45 65 L55 65 L58 75 L42 75 Z"
                className="fill-purple-500"
              >
                <animate
                  attributeName="fill"
                  values="#7C3AED;#9F7AEA;#7C3AED"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          )}
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isSuccess ? "Order Successful!" : "Processing Order"}
          </h2>
          <p className="text-purple-400 font-mono">
            {isSuccess ? "Redirecting you back to home..." : currentQuip}
          </p>
          <div className="text-gray-400 text-sm mt-4">
            {isSuccess ? "Thank you for your order!" : "Please wait while we initialize your request..."}
          </div>
        </div>
      </div>
    </div>
  );
} 