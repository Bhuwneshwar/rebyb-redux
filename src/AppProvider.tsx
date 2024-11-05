// src/AppProvider.tsx

import { createContext, useContext, useReducer, ReactNode } from "react";

// Define the shape of the context using generics
interface AppContextType<S> {
  store: S;
  dispatch: <K extends keyof S>(name: K, value: S[K]) => void;
  multiDispatch: (actions: [keyof S, S[keyof S]][]) => void;
}

// Initialize the context with an empty object and type assertion
const AppContext = createContext<AppContextType<any>>(
  {} as AppContextType<any>
);

interface AppProviderProps<S> {
  initialState: S;
  children: ReactNode;
}

function AppProvider<S>({ initialState, children }: AppProviderProps<S>) {
  // Reducer function to handle state changes
  const reducer = (state: S, actions: [keyof S, S[keyof S]][]): S => {
    return actions.reduce((newState, [name, value]) => {
      return { ...newState, [name]: value };
    }, state);
  };

  const [state, dispatchAction] = useReducer(reducer, initialState);

  // Dispatch a single action
  const dispatch = <K extends keyof S>(name: K, value: S[K]) => {
    dispatchAction([[name, value]]);
  };

  // Dispatch multiple actions
  const multiDispatch = (actions: [keyof S, S[keyof S]][]) => {
    dispatchAction(actions);
  };

  return (
    <AppContext.Provider
      value={{ store: state, dispatch, multiDispatch } as AppContextType<S>}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to access AppContext with type inference
function useRebybRedux<S>() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useRebybRedux must be used within an AppProvider");
  }
  return context as AppContextType<S>;
}

export { AppProvider, useRebybRedux };

// // src/AppProvider.tsx

// import React, { createContext, useContext, useReducer, ReactNode } from "react";
// import defaultStore from "./rebybStore"; // Import the default store

// // Define InitialState as a type based on the default store's structure
// type InitialState = typeof defaultStore;

// // Define the AppState interface with the dynamic InitialState type
// interface AppState {
//   store: InitialState;
//   dispatch: <K extends keyof InitialState>(
//     name: K,
//     value: InitialState[K]
//   ) => void;
//   multiDispatch: (actions: Action[]) => void;
// }

// // Define Action type for dynamic state
// type Action = [keyof InitialState, InitialState[keyof InitialState]];

// // Create the AppContext
// const AppContext = createContext<AppState | undefined>(undefined);

// // Define AppProviderProps to accept an optional initialStore and children
// interface AppProviderProps {
//   initialStore?: InitialState; // Optional initialStore prop
//   children: ReactNode;
// }

// // Reducer function to manage state updates
// const reducer = (state: InitialState, actions: Action[]): InitialState => {
//   let newState = { ...state };
//   actions.forEach(([name, value]) => {
//     newState = {
//       ...newState,
//       [name]: value,
//     };
//   });
//   return newState;
// };

// // AppProvider component with dynamic initial store
// const AppProvider: React.FC<AppProviderProps> = ({
//   initialStore,
//   children,
// }) => {
//   // type InitialState = typeof initialStore;
//   // Initialize state with initialStore if provided, otherwise defaultStore
//   const [state, dispatchAction] = useReducer(
//     reducer,
//     initialStore || defaultStore
//   );

//   // Dispatch function to handle individual actions
//   const dispatch = <K extends keyof InitialState>(
//     name: K,
//     value: InitialState[K]
//   ) => {
//     dispatchAction([[name, value]]);
//   };

//   // MultiDispatch function to handle multiple actions at once
//   const multiDispatch = (actions: Action[]) => {
//     dispatchAction(actions);
//   };

//   return (
//     <AppContext.Provider value={{ store: state, dispatch, multiDispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// // Custom hook to access the global context
// const useGlobalContext = (): AppState => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useGlobalContext must be used within an AppProvider");
//   }
//   return context;
// };

// export { AppProvider, AppContext, useGlobalContext };

// import React, { createContext, useContext, useReducer, ReactNode } from "react";
// import initialState,{InitialStateTypes} from "./rebybStore"; './rebybStore'
// // let initialState: any;
// // const useInitialState = (state) => {
// //   if (!initialState) {
// //     initialState = state;
// //   }
// // };

// // type InitialStateTypes = typeof initialState;

// // Define the initial state type
// interface AppState {
//   store: InitialStateTypes;
//   dispatch: <K extends keyof InitialStateTypes>(
//     name: K,
//     value: InitialStateTypes[K]
//   ) => void;
//   multiDispatch: (actions: Action[]) => void;
// }

// // Define the action type as a tuple
// type Action = [
//   keyof InitialStateTypes,
//   InitialStateTypes[keyof InitialStateTypes]
// ];

// const AppContext = createContext<AppState | undefined>(undefined);

// const reducer = (
//   state: InitialStateTypes,
//   actions: Action[]
// ): InitialStateTypes => {
//   let newState = { ...state };
//   actions.forEach(([name, value]) => {
//     newState = {
//       ...newState,
//       [name]: value,
//     };
//   });
//   return newState;
// };

// interface AppProviderProps {
//   children: ReactNode;
// }

// const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
//   const [state, dispatchAction] = useReducer(reducer, initialState);

//   const dispatch = <K extends keyof InitialStateTypes>(
//     name: K,
//     value: InitialStateTypes[K]
//   ) => {
//     dispatchAction([[name, value]]);
//   };

//   const multiDispatch = (actions: Action[]) => {
//     dispatchAction(actions);
//   };

//   return (
//     <AppContext.Provider value={{ store: state, dispatch, multiDispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// const useRebybRedux = (): AppState => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useRebybRedux must be used within an AppProvider");
//   }
//   return context;
// };

// export { AppProvider, AppContext, useRebybRedux };
