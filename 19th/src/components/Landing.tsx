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
            style={{
              background: 'linear-gradient(135deg, #ffb880, #ffc799, #ffd6b3)',
              boxShadow: '0 10px 25px -5px rgba(255, 184, 128, 0.5)',
              borderColor: 'rgba(255, 229, 204, 0.3)',
            }}
            className="group relative inline-flex items-center justify-center px-14 py-7 text-xl font-semibold text-white transition-all duration-700 ease-out rounded-3xl hover:scale-110 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none overflow-hidden border-2 backdrop-blur-sm"
            disabled={state.isTransitioning}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 20px 40px -10px rgba(255, 184, 128, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                '0 10px 25px -5px rgba(255, 184, 128, 0.5)';
            }}
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

            {/* Pulsing ring animation */}
            <span
              className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-30 animate-pulse"
              style={{
                background: 'linear-gradient(135deg, #ffc799, #ffb880)',
              }}
            ></span>

            {/* Button content */}
            <span className="relative z-10 flex items-center space-x-4">
              {state.isTransitioning ? (
                <>
                  <div className="relative">
                    <svg
                      className="animate-spin h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-30"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      ></circle>
                      <path
                        className="opacity-80"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping"></span>
                  </div>
                  <span className="tracking-wide">Preparing...</span>
                </>
              ) : (
                <>
                  <span className="tracking-wide">Begin Your Journey</span>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-6 h-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.404 2.902a1 1 0 01.732 1.698L6.025 10.5H13a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H6.025l4.111 5.9a1 1 0 11-1.632 1.198L3.336 13.7a2 2 0 010-3.4l5.068-7.398z" />
                    </svg>
                  </div>
                </>
              )}
            </span>
          </button>

          <p className="text-gray-600 italic text-base font-light lora animate-pulse">
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
