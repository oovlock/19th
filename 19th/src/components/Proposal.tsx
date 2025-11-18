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
          className="bg-dusty-rose hover:bg-pink text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Back to Landing
        </button>
      </div>
    </div>
  );
};

export default Proposal;
