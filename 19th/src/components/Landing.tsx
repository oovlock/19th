import React from 'react';
import { useAppContext } from '../hooks';
import { Phase } from '../hooks';
import { useParticleSystem } from '../hooks';
import '../styles/globals.css';

const Landing: React.FC = () => {
  const { state, transitionToPhase } = useAppContext();
  const { canvasRef } = useParticleSystem(true);

  const handleGetStarted = () => {
    transitionToPhase(Phase.PROPOSAL);
  };

  return (
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
            My baby
          </p>
        </div>

        <div className="space-y-6">
          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center justify-center px-12 py-6 text-lg font-medium text-white transition-all duration-500 ease-out bg-gradient-to-r from-pink via-pink to-light-pink rounded-full shadow-2xl hover:shadow-pink/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
            disabled={state.isTransitioning}
          >
            {/* Button background shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></span>

            {/* Button text */}
            <span className="relative z-10 flex items-center space-x-3">
              {state.isTransitioning ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <span>Begin Your Journey</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </span>

            {/* Decorative ring animation */}
            <span className="absolute inset-0 rounded-full border-2 border-pink/20 animate-ping"></span>
          </button>

          <p className="text-gray-600 italic text-base font-light lora">
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
  );
};

export default Landing;
