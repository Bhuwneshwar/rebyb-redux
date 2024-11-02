import React, { createContext, useContext, useReducer, ReactNode } from "react";
import initialState, { InitialStateTypes } from "./rebybStore";

// Define the initial state type
interface AppState {
  store: InitialStateTypes;
  dispatch: <K extends keyof InitialStateTypes>(
    name: K,
    value: InitialStateTypes[K]
  ) => void;
  multiDispatch: (actions: Action[]) => void;
}

// Define the action type as a tuple
type Action = [
  keyof InitialStateTypes,
  InitialStateTypes[keyof InitialStateTypes]
];

const AppContext = createContext<AppState | undefined>(undefined);

const reducer = (
  state: InitialStateTypes,
  actions: Action[]
): InitialStateTypes => {
  let newState = { ...state };
  actions.forEach(([name, value]) => {
    newState = {
      ...newState,
      [name]: value,
    };
  });
  return newState;
};

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatchAction] = useReducer(reducer, initialState);

  const dispatch = <K extends keyof InitialStateTypes>(
    name: K,
    value: InitialStateTypes[K]
  ) => {
    dispatchAction([[name, value]]);
  };

  const multiDispatch = (actions: Action[]) => {
    dispatchAction(actions);
  };

  return (
    <AppContext.Provider value={{ store: state, dispatch, multiDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useRebybRedux = (): AppState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useRebybRedux must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, AppContext, useRebybRedux };
