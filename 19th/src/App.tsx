import React from 'react';
import { AppProvider, useAppContext } from './hooks';
import { Phase } from './hooks';
import Landing from './components/Landing';
import Proposal from './components/Proposal';
import './styles/globals.css';

const AppContent: React.FC = () => {
  const { state } = useAppContext();

  const renderCurrentPhase = () => {
    switch (state.currentPhase) {
      case Phase.AUTH:
        return <Landing showAuthModal={true} />;
      case Phase.LANDING:
        return <Landing />;
      case Phase.PROPOSAL:
        return <Proposal />;
      case Phase.ACCEPTANCE:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="playfair text-5xl font-bold text-gray-800">
                Acceptance Phase
              </h1>
              <p className="lora text-lg text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      case Phase.CELEBRATION:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="playfair text-5xl font-bold text-gray-800">
                Celebration Phase
              </h1>
              <p className="lora text-lg text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Landing />;
    }
  };

  return <div className="App">{renderCurrentPhase()}</div>;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
