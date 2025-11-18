import type { AppState, AppAction } from './appState';
import { appReducer, initialState } from './appState';
import { createContext, useContext, useReducer, type ReactNode } from 'react';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  transitionToPhase: (phase: AppState['currentPhase']) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const transitionToPhase = (phase: AppState['currentPhase']) => {
    dispatch({ type: 'SET_TRANSITIONING', payload: true });

    // Simulate transition delay
    setTimeout(() => {
      dispatch({ type: 'TRANSITION_TO_PHASE', payload: phase });
    }, 300);
  };

  const value: AppContextType = {
    state,
    dispatch,
    transitionToPhase,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
