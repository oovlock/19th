export const Phase = {
  LANDING: 'landing',
  PROPOSAL: 'proposal',
  ACCEPTANCE: 'acceptance',
  CELEBRATION: 'celebration',
} as const;

export type Phase = (typeof Phase)[keyof typeof Phase];

export interface AppState {
  currentPhase: Phase;
  isTransitioning: boolean;
}

export type AppAction =
  | { type: 'TRANSITION_TO_PHASE'; payload: Phase }
  | { type: 'SET_TRANSITIONING'; payload: boolean }
  | { type: 'RESET_STATE' };

export const initialState: AppState = {
  currentPhase: Phase.LANDING,
  isTransitioning: false,
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'TRANSITION_TO_PHASE':
      return {
        ...state,
        currentPhase: action.payload,
        isTransitioning: false,
      };
    case 'SET_TRANSITIONING':
      return {
        ...state,
        isTransitioning: action.payload,
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
};
