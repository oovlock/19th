// Re-export all app state types and utilities
export {
  Phase,
  type AppState,
  type AppAction,
  initialState,
  appReducer,
} from './appState';

// Re-export hooks
export { useParticleSystem } from './useParticleHook';
export type { Particle } from './useParticleSystem';

// Re-export context components
export { AppProvider, useAppContext } from './AppContext';
