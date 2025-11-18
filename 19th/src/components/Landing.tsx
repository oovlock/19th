import React, { useState } from 'react';
import { useAppContext } from '../hooks';
import { Phase } from '../hooks';
import { useParticleSystem } from '../hooks';
import AuthModal from './AuthModal';
import SeedAnimation from './SeedAnimation';
import '../styles/globals.css';

interface LandingProps {
  showAuthModal?: boolean;
}

const Landing: React.FC<LandingProps> = ({ showAuthModal = false }) => {
  const { state, transitionToPhase } = useAppContext();
  const { canvasRef } = useParticleSystem(true);
  const [showSeedAnimation, setShowSeedAnimation] = useState(false);

  const handleGetStarted = () => {
    transitionToPhase(Phase.PROPOSAL);
  };

  const handleAuthSuccess = () => {
    setShowSeedAnimation(true);
  };

  const handleSeedAnimationComplete = () => {
    setShowSeedAnimation(false);
  };

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-center">
        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="particle-container" />

        {/* Main Content */}
        <div className="content-overlay text-center px-4 fade-in">
          <h1 className="playfair text-6xl md:text-8xl font-bold mb-6 text-gray-800">
            Welcome
          </h1>

          <div className="max-w-2xl mx-auto mb-8">
            <p className="dancing text-3xl md:text-4xl mb-4 text-gray-700">
              A Special Moment Awaits
            </p>
            <p className="lora text-lg md:text-xl text-gray-600 leading-relaxed">
              This is the beginning of something beautiful. Take a moment to
              prepare yourself for what comes next.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGetStarted}
              className="bg-pink hover:bg-light-pink text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              disabled={state.isTransitioning}
            >
              {state.isTransitioning ? 'Preparing...' : 'Begin Your Journey'}
            </button>

            <p className="text-sm text-gray-500 italic">
              Take a deep breath and click when you're ready
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center space-x-8">
            <div
              className="w-2 h-2 bg-gold rounded-full animate-pulse"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-pink rounded-full animate-pulse"
              style={{ animationDelay: '75ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-light-pink rounded-full animate-pulse"
              style={{ animationDelay: '150ms' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onSuccess={handleAuthSuccess} />}

      {/* Seed Animation */}
      {showSeedAnimation && (
        <SeedAnimation onComplete={handleSeedAnimationComplete} />
      )}
    </>
  );
};

export default Landing;
