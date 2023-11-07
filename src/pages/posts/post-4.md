---
layout: "../../layouts/MarkdownPost.astro"
title: "Typescript Basics"
author: Nidhish
description: "Basics of typescript and guide on how to use it."
pubDate: 2023-11-08
readTime: "10 min read"
image:
  url: "https://ik.imagekit.io/fabric01/nid-blog/ts.webp?updatedAt=1699361519800"
  alt: "Thumbnail of Astro arcs."
  lazyUrl: "https://ik.imagekit.io/fabric01/nid-blog/ts_min.png?updatedAt=1699361520702"
tags: ["guide", "syntax", "typescript"]
---

# Introduction

JavaScript is an incredibly popular and versatile programming language, used for building web applications, mobile apps, and even server-side applications. However, as projects grow in size and complexity, JavaScript's dynamically typed nature can lead to bugs that are difficult to catch. This is where TypeScript comes to the rescue. TypeScript is a statically typed superset of JavaScript that enhances the language with strong type checking, making it a powerful tool for building robust and maintainable software.

In this blog, we'll explore TypeScript, from the basics to advanced concepts. We'll cover how to get started, the benefits of using TypeScript, and provide practical examples to illustrate its usage.

## TypeScript Basics

### 1. Setting Up TypeScript

To start using TypeScript, you need to install it globally or as a local dependency in your project. You can do this using npm or yarn. Here's a basic setup:

```bash
npm install -g typescript
```

### 2. Creating Your First TypeScript File

Once TypeScript is installed, create a `.ts` file (e.g., `app.ts`) and write some TypeScript code:

```typescript
function greet(name: string) {
	return `Hello, ${name}!`;
}

console.log(greet("TypeScript"));
```

### 3. Compiling TypeScript

To run TypeScript code in a JavaScript environment, you need to compile it. Use the `tsc` command:

```bash
tsc app.ts
```

This command generates an `app.js` file, which you can execute in a browser or Node.js.

## Benefits of TypeScript

1. **Type Safety**: TypeScript enforces static typing, reducing runtime errors and making your code more reliable.

2. **Tooling Support**: TypeScript works well with code editors like Visual Studio Code, providing real-time feedback and code suggestions.

3. **Readability**: Type annotations make your code self-documenting, making it easier for developers to understand and maintain.

4. **Better Refactoring**: TypeScript's type system helps identify areas that need refactoring, leading to cleaner and more maintainable code.

5. **Enhanced Collaboration**: Teams can collaborate more effectively because the codebase is less prone to bugs and miscommunication.

## Advanced Concepts

### 1. Interfaces and Types

TypeScript introduces the concept of interfaces and custom types to define the shape of objects and their properties:

```typescript
interface Person {
	name: string;
	age: number;
}

const john: Person = { name: "John", age: 30 };
```

### 2. Generics

Generics allow you to write flexible and reusable code. For example, you can create a generic function to work with various data types:

```typescript
function identity<T>(arg: T): T {
	return arg;
}
```

### 3. Decorators

Decorators are a powerful feature that enables you to modify class declarations, methods, and properties. They are widely used in frameworks like Angular:

```typescript
function log(target: any, key: string) {
	console.log(`Calling ${key} method`);
}

class Example {
	@log
	doSomething() {
		// ...
	}
}
```

## Real-World Examples

Let's explore some real-world scenarios where TypeScript can make a significant impact:

### 1. Building a React Application

TypeScript is commonly used with React for creating well-structured and type-safe components. Here's an example of a simple React component:

```typescript
import React, { useState } from "react";

interface CounterProps {
	initialCount: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount }) => {
	const [count, setCount] = useState(initialCount);

	const increment = () => setCount(count + 1);
	const decrement = () => setCount(count - 1);

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
		</div>
	);
};
```

### 2. Building a Node.js Server

In Node.js, TypeScript can bring strong typing and improved error handling. Here's a simple example of a TypeScript-based server using Express:

```typescript
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello, TypeScript!");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
```

# Conclusion

TypeScript is a valuable tool for both JavaScript beginners and seasoned developers. It provides the benefits of static typing and advanced features that enhance code quality, maintainability, and collaboration. By understanding the basics and exploring advanced concepts, you can leverage TypeScript to build robust and efficient software.

So, whether you're building web applications, mobile apps, or server-side solutions, consider incorporating TypeScript into your toolkit to take full advantage of its capabilities and create high-quality, maintainable code. Happy coding!
