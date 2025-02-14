# **rebyb-redux** - Lightweight State Management for React

`rebyb-redux` is a lightweight, Redux-like state management solution for React applications. Built with TypeScript, it provides a simple API for managing global state with dispatching capabilities, making it a great choice for apps that need global state without the complexity of Redux.

---

## **Features **

- 🔧 **Global State Management**: Share and manage state across your React app.
- ⚙️ **Single and Multi-Dispatch**: Update individual or multiple properties with `dispatch` and `multiDispatch`.
- 🔄 **Flexible Initial State**: Allows developers to define their own initial state and types.
- 🛡️ **TypeScript Support**: Full TypeScript support for safer, more reliable state management.

---

## **Installation**

Install the package via npm:

```bash
npm install rebyb-redux
```

Or with yarn:

```bash
yarn add rebyb-redux
```

---

## **Setup and Usage**

### 1. **Define Initial State and Types**

Create a file for your initial state (e.g., `src/customStore.ts`):

```typescript
// src/customStore.ts

export interface InitialStateTypes {
  nav: boolean;
  activeTab: string;
  name?: string; // Optional
}

const initialState: InitialStateTypes = {
  nav: false,
  activeTab: "home",
};

export default initialState;
```

### 2. **Wrap Your App with `AppProvider`**

In your main file (e.g., `src/index.tsx`), wrap the app with `AppProvider` and pass the `initialState` to it.

```typescript
// src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "rebyb-redux";
import App from "./App";
import initialState from "./customStore";

ReactDOM.render(
  <AppProvider initialState={initialState}>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
```

### 3. **Access and Modify State with `useRebybRedux `**

In any component, use the `useRebybRedux` hook to access the global state and dispatch functions. For full TypeScript support, pass `InitialStateTypes` as a generic parameter to `useRebybRedux`.

```typescript
// src/App.tsx

import React from "react";
import { useRebybRedux } from "rebyb-redux";
import { InitialStateTypes } from "./customStore";

const App: React.FC = () => {
  const { store, dispatch, multiDispatch } = useRebybRedux<InitialStateTypes>();

  const toggleNav = () => {
    dispatch("nav", !store.nav);
  };

  const switchTab = (tab: string) => {
    dispatch("activeTab", tab);
  };

  return (
    <div>
      <h1>Current Tab: {store.activeTab}</h1>
      <button onClick={() => switchTab("home")}>Home</button>
      <button onClick={() => switchTab("profile")}>Profile</button>
      <button onClick={toggleNav}>
        {store.nav ? "Hide Navigation" : "Show Navigation"}
      </button>
    </div>
  );
};

export default App;
```

---

## **API Reference**

### **`<AppProvider>`**

The `AppProvider` component is used to wrap your app or a section of it. It provides the global state to all children.

#### Props

- **`initialState`** _(required)_: The initial state for the application.

### **`useRebybRedux`**

A hook to access the global state and dispatch functions.

#### Type Parameters

- **`<T>`**: The type of the initial state, for TypeScript support.

#### Returns

- **`store`**: The current global state.
- **`dispatch(name: keyof T, value: T[keyof T])`**: Function to update a single property in the state.
- **`multiDispatch(actions: [keyof T, T[keyof T]][])`**: Function to update multiple properties at once.

---

## **Examples**

### **Example 1: Basic State Update**

```typescript
const { store, dispatch } = useRebybRedux<InitialStateTypes>();

// Toggle the navigation state
dispatch("nav", !store.nav);
```

### **Example 2: Multi-Dispatch**

```typescript
const { multiDispatch } = useRebybRedux<InitialStateTypes>();

multiDispatch([
  ["activeTab", "settings"],
  ["name", "Jane Doe"],
]);
```

---

## **Contributing**

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

---

## **License**

MIT License
