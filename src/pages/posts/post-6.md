---
layout: "../../layouts/MarkdownPost.astro"
title: "Redux Toolkit with React"
author: Nidhish
description: "Basics of redux-toolkit and how to use it with react."
pubDate: 2023-11-08
readTime: "15 min read"
image:
  url: "https://ik.imagekit.io/fabric01/nid-blog/redux-toolkit.webp?updatedAt=1699444950547"
  alt: "redux-toolkit"
  lazyUrl: "https://ik.imagekit.io/fabric01/nid-blog/redux-toolkit-min.png?updatedAt=1699444950537"
tags: ["guide", "react", "redux-toolkit", "syntax", "typescript"]
---

# Redux Toolkit with React

Redux Toolkit is a library that simplifies the management of state in a Redux-based application. It provides a set of utilities and best practices to help you write more efficient and concise Redux code. Redux Toolkit is often used in conjunction with TypeScript to add static typing to your Redux store. Here are the basics of Redux Toolkit and how to use it with TypeScript:

### Installing Redux Toolkit

To use Redux Toolkit, you first need to install it along with Redux. You can do this using npm or yarn:

```bash
npm install @reduxjs/toolkit react-redux redux
```

### Creating a Redux Store

1. **Create a Redux Slice**: A Redux slice is a set of actions and reducers for a specific part of your application's state. You can create a slice using `createSlice` from Redux Toolkit.

   ```typescript
   // counterSlice.ts
   import { createSlice } from '@reduxjs/toolkit';

   const counterSlice = createSlice({
     name: 'counter',
     initialState: 0,
     reducers: {
       increment: (state) => state + 1,
       decrement: (state) => state - 1,
     },
   });

   export const { increment, decrement } = counterSlice.actions;
   export default counterSlice.reducer;
   ```

2. **Create a Redux Store**: Use `configureStore` to create your Redux store and include your slices. Also, set up the store with any middleware you need, such as the Redux DevTools extension.

   ```typescript
   // store.ts
   import { configureStore } from '@reduxjs/toolkit';
   import counterReducer from './counterSlice';

   const store = configureStore({
     reducer: {
       counter: counterReducer,
     },
   });

   export default store;
   ```

### Using Redux in Your React Components

3. **Connect Redux to Your React Application**: Use the `Provider` component from `react-redux` to wrap your React application and provide access to the Redux store.

   ```typescript
   // index.tsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { Provider } from 'react-redux';
   import store from './store';
   import App from './App';

   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   );
   ```

4. **Access Redux State and Dispatch Actions in Components**: You can use the `useSelector` hook to access state from the Redux store and `useDispatch` to dispatch actions.

   ```typescript
   // Counter.tsx
   import React from 'react';
   import { useSelector, useDispatch } from 'react-redux';
   import { increment, decrement } from './counterSlice';

   const Counter = () => {
     const count = useSelector((state) => state.counter);
     const dispatch = useDispatch();

     return (
       <div>
         <button onClick={() => dispatch(increment())}>Increment</button>
         <span>{count}</span>
         <button onClick={() => dispatch(decrement())}>Decrement</button>
       </div>
     );
   };

   export default Counter;
   ```

### Using Redux Toolkit with TypeScript

When using TypeScript with Redux Toolkit, you can get strong type checking for your state, actions, and reducers. Here's how to set up TypeScript with Redux Toolkit:

1. **Type Definitions**: Define types for your state and action payloads.

   ```typescript
   // counterSlice.ts
   import { createSlice, PayloadAction } from '@reduxjs/toolkit';

   interface CounterState {
     value: number;
   }

   const initialState: CounterState = { value: 0 };

   const counterSlice = createSlice({
     name: 'counter',
     initialState,
     reducers: {
       increment: (state) => {
         state.value += 1;
       },
       decrement: (state) => {
         state.value -= 1;
       },
     },
   });

   export const { increment, decrement } = counterSlice.actions;
   export default counterSlice.reducer;
   ```

2. **Configure the Store with TypeScript**: When creating the store, you can specify the root state type using the `RootState` type from Redux Toolkit.

   ```typescript
   // store.ts
   import { configureStore } from '@reduxjs/toolkit';
   import counterReducer from './counterSlice';

   const store = configureStore({
     reducer: {
       counter: counterReducer,
     },
   });

   export default store;
   ```

3. **Use TypeScript with Components**: Redux Toolkit will automatically infer types for your state and action creators, so you can access and dispatch actions with type safety.

   ```typescript
   // Counter.tsx
   import React from 'react';
   import { useSelector, useDispatch } from 'react-redux';
   import { increment, decrement } from './counterSlice';
   import { RootState } from './store';

   const Counter = () => {
     const count = useSelector((state: RootState) => state.counter.value);
     const dispatch = useDispatch();

     return (
       <div>
         <button onClick={() => dispatch(increment())}>Increment</button>
         <span>{count}</span>
         <button onClick={() => dispatch(decrement())}>Decrement</button>
       </div>
     );
   };

   export default Counter;
   ```

By following these steps, you can use Redux Toolkit with TypeScript to manage the state of your React application in a type-safe and efficient manner.
