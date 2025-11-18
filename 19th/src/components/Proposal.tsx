import React from 'react';
import { useAppContext } from '../hooks';
import { Phase } from '../hooks';
import '../styles/globals.css';

const Proposal: React.FC = () => {
  const { transitionToPhase } = useAppContext();

  const handleBack = () => {
    transitionToPhase(Phase.LANDING);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="content-overlay text-center px-4 fade-in">
        <h1 className="playfair text-5xl md:text-7xl font-bold mb-6 text-gray-800">
          Proposal Phase
        </h1>

        <p className="lora text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          This is where the magic will happen. The proposal experience is coming
          soon...
        </p>

        <button
          onClick={handleBack}
          style={{
            background: 'linear-gradient(135deg, #ffb880, #ffc799, #ffd6b3)',
            boxShadow: '0 10px 25px -5px rgba(255, 184, 128, 0.5)',
            borderColor: 'rgba(255, 229, 204, 0.3)',
          }}
          className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white transition-all duration-700 ease-out rounded-2xl hover:scale-105 overflow-hidden border-2 backdrop-blur-sm"
        >
          {/* Animated background gradient */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 214, 179, 0.4), transparent, rgba(255, 184, 128, 0.4))',
            }}
          ></span>

          {/* Shimmer effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out"></span>

          {/* Button content */}
          <span className="relative z-10 flex items-center space-x-3">
            <svg
              className="w-5 h-5 transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="tracking-wide">Back to Landing</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Proposal;
