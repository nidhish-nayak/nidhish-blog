---
layout: "../../layouts/MarkdownPost.astro"
title: "React Context Api"
author: Nidhish
description: "How to implement react context api in a react application."
pubDate: 2023-11-08
readTime: "12 min read"
image:
  url: "https://ik.imagekit.io/fabric01/nid-blog/React_Context.webp?updatedAt=1699349296964"
  alt: "Thumbnail of Astro arcs."
  lazyUrl: "https://ik.imagekit.io/fabric01/nid-blog/React_Context_min.png?updatedAt=1699349443338"
tags: ["react", "hooks", "javascript", "guide", "syntax"]
---

# useContext

useContext is a React Hook that lets you read and subscribe to context from your component.

```js
const value = useContext(SomeContext);
```

## Writing code using context api:

Context api is usually used when you need a common state management for multiple components. This is also used to reduce prop drilling between multiple components.

To start with context api, create a file called "categories.context.jsx". You can initialize as below using `createContext()`:

```js
// categories.context.js
import { createContext } from "react";
export const CategoriesContext = createContext({
	categoriesMap: {},
});
```

In a context you will have 2 arguements which you can use as per your needs, <b>state</b> and <b>action</b>. Action contains 2 parameters, <b>type</b> and <b>payload</b>. Type can be used to tell the context what action you want to be triggered followed by payload which contains the data you want to update. We will look into how we can trigger the context depending on type later.

Now, you can define action types and initial state in your context file as below:

```js
export const CATEGORIES_ACTION_TYPES = {
	SET_CATEGORIES_MAP: "SET_CATEGORIES_MAP",
};
const INITIAL_STATE = {
	categoriesMap: {},
};
```

#### Define categories reducer to handle the state and action.

```js
const categoriesReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
			return {
				...state,
				categoriesMap: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in the userReducer !`);
	}
};
```

#### Define Category Provider.

You can define dispatch actions for setCategoriesMap type.

```js
export const CategoriesProvider = ({ children }) => {
	// const [categoriesMap, setCategoriesMap] = useState({});
	const [{ categoriesMap }, dispatch] = useReducer(
		categoriesReducer,
		INITIAL_STATE
	);
	const value = { categoriesMap };

	const setCategoriesMap = (categoryMap) => {
		dispatch({
			type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP,
			payload: categoryMap,
		});
	};
	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
```

After defining the context file, you can wrap the provided outside the components you want to access it.

```js
// index.js
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<CategoriesProvider>
					<App />
				</CategoriesProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
```

## Easy example:

The React Context API is a way to share data or state information between components in a React application without the need to pass props through every level of the component tree. It's especially useful when you have data that many components need to access, like user authentication status, theme preferences, or language settings.

Here's a simple and easy-to-understand explanation of how the React Context API works, along with an example:

1. **Creating a Context**:
   First, you create a context using `React.createContext()`. This function returns an object with two components: `Provider` and `Consumer`. The `Provider` is used to wrap the part of your component tree where you want to share data, and the `Consumer` is used to access that shared data.

```javascript
// Create a context
const MyContext = React.createContext();
```

2. **Providing Data**:
   Wrap the part of your component tree with the `Provider`. This provider component takes a `value` prop, which is the data you want to share with the components underneath.

```javascript
function App() {
	const sharedData = "This data is shared";

	return (
		<MyContext.Provider value={sharedData}>
			<ChildComponent />
		</MyContext.Provider>
	);
}
```

3. **Consuming Data**:
   Components that need access to the shared data can use the `Consumer` component. You can do this using a `render prop` or using the `useContext` hook, which simplifies the code.

   Using `Consumer` with a render prop:

```javascript
function ChildComponent() {
	return <MyContext.Consumer>{(data) => <div>{data}</div>}</MyContext.Consumer>;
}
```

Using the `useContext` hook:

```javascript
import React, { useContext } from "react";

function ChildComponent() {
	const data = useContext(MyContext);

	return <div>{data}</div>;
}
```

In this example, the `sharedData` is provided by the `MyContext.Provider` component and can be accessed in the `ChildComponent` without the need to pass it down as a prop through intermediary components.

The React Context API is useful for managing global state, such as user authentication, theme, or language preferences, and it simplifies the process of sharing data between different parts of your application.
