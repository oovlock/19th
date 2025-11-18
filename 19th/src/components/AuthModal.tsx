import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../hooks';
import { Phase } from '../hooks';

interface AuthModalProps {
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { transitionToPhase } = useAppContext();

  // Focus trap and initial focus
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Keep modal open, just clear input
        setPassword('');
        setError(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        // Keep modal open when clicking outside
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === '161104') {
      setError(false);
      setIsShaking(false);
      
      // Trigger success animation and transition
      setTimeout(() => {
        onSuccess();
        transitionToPhase(Phase.LANDING);
      }, 300);
    } else {
      setError(true);
      setIsShaking(true);
      
      // Remove shake animation after it completes
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) {
      setError(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal content */}
      <div
        ref={modalRef}
        className={`relative bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-white/30 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        <div className="text-center">
          {/* Decorative element */}
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink to-light-pink rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h2 className="playfair text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="lora text-gray-600 mb-6">
            Enter the password to continue your journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className={`w-full px-4 py-3 rounded-lg border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent transition-all duration-300 ${
                  error
                    ? 'border-red-500 bg-red-50/50'
                    : 'border-gray-300/50'
                }`}
                aria-label="Password"
                aria-invalid={error}
                aria-describedby={error ? 'password-error' : undefined}
              />
              {error && (
                <p
                  id="password-error"
                  className="mt-2 text-sm text-red-600 animate-fade-in"
                >
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink to-light-pink text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
            >
              Unlock
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500 italic">
            Hint: The answer lies in the stars
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;