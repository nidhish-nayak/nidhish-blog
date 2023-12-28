---
layout: "../../layouts/MarkdownPost.astro"
title: "Setup nodejs with typescript & zod"
author: Nidhish
description: "All you need to setup a local nodejs server with express, typescript and zod."
pubDate: 2023-12-28
readTime: "15 min read"
image:
    url: "https://ik.imagekit.io/fabric01/nid-blog/zod.webp?updatedAt=1703755126985"
    alt: "nodejs with typescript and zod"
    lazyUrl: "https://ik.imagekit.io/fabric01/nid-blog/zod_min.png?updatedAt=1703755126058"
tags: ["guide", "setup", "nodejs", "expressjs", "typescript", "zod"]
---

# Setup NodeJS with TypeScript & Zod

## Introduction

Building a robust and maintainable Express.js server requires careful consideration of your development stack. In this guide, we'll walk through the process of setting up a Node.js server using TypeScript for static typing and Zod for schema validation. This powerful combination enhances code quality and improves the overall development experience. Let's dive in!

## Table of Contents

1. Why TypeScript and Zod?
2. Project Initialization
3. Installing Dependencies
4. TypeScript Configuration
5. Setting Up Express with TypeScript
6. Adding Zod for Schema Validation
7. Adding eslint config
8. Conclusion

### 1. Why TypeScript and Zod?

Before we start, let's briefly discuss why TypeScript and Zod are a great fit for building Express applications.

-   **TypeScript:** Provides static typing, catching potential errors during development, and enhancing code readability.
-   **Zod:** A TypeScript-first schema validation library, ensuring that your data adheres to the specified structure.

### 2. Project Initialization

Begin by initializing your Node.js project. Open your terminal and navigate to your project's root directory:

```bash
# Create a package.json file
npm init -y
```

Copy the below to your package.json file:

```json
{
    "name": "",
    "version": "1.0.0",
    "main": "main.ts",
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": "Handles all the server side features",
    "scripts": {
        "dev": "nodemon src/main.ts --ext ts",
        "prettier": "prettier --write ."
    },
    "devDependencies": {
        "@types/cors": "^2.8.17",
        "@types/express": "^4.17.21",
        "@types/node": "^20.10.5",
        "@typescript-eslint/eslint-plugin": "^6.16.0",
        "eslint": "^8.56.0",
        "eslint-plugin-prettier": "^5.1.2",
        "nodemon": "^3.0.2",
        "prettier": "^3.1.1",
        "ts-node": "^10.9.2",
        "tsconfig-paths": "^4.2.0",
        "typescript": "^5.3.3"
    },
    "dependencies": {
        "cors": "^2.8.5",
        "express": "^4.18.2",
        "zod": "^3.22.4"
    }
}
```

### 3. Installing Dependencies

Install the necessary dependencies: Express, TypeScript, and Zod.

```bash
# Install all dependencies
npm install
```

### 4. TypeScript Configuration

Create a `tsconfig.json` file in your project root to configure TypeScript. Add the following:

```json
{
    "ts-node": {
        "require": ["tsconfig-paths/register"]
    },
    "compilerOptions": {
        "target": "ES2016",
        "module": "commonjs",
        "outDir": "dist",
        "rootDir": "src",
        "strict": true,
        "moduleResolution": "node",
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "paths": {
            "$/*": ["./src/*"]
        }
    },
    "include": ["./src/**/*.ts", ".eslintrc.cjs"]
}
```

### 5. Setting Up Express with TypeScript

Create an `src` directory in your project, and within it, create a file named `main.ts` for your Express application.

```typescript
// main.ts
import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import { zodMiddleware } from "./middlewares/zod.middleware";

const app: Application = express();

app.use(express.json());

// Routes
app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World!");
});

// Global catches using zod
app.use(zodMiddleware);

// Listener
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on port: " + `http://localhost:${PORT}`);
});
```

### 6. Adding Zod for Schema Validation

Now, let's enhance our server by adding Zod for schema validation. Create a `middleware` directory within `src`, and in it, create a file named `zodMiddleware.ts`. This will be executed after all your route handlers are executed, where any error or exception occured will be handled by the below file.

```typescript
// zodMiddleware.ts
import { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";

export function zodMiddleware(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    if (err instanceof z.ZodError) {
        res.status(400).json({
            error: err.flatten(),
        });
        return;
    } else if (err instanceof Error) {
        const error = err as Error & { statusCode?: number };
        res.status(error.statusCode ?? 400).json({
            message: err.message,
        });
        return;
    }
    res.status(500).json({
        message: "Internal server error",
    });
}
```

### 7. Adding eslint config

```json
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
    overrides: [
        {
            files: ["*.ts"],
            extends: [
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],
            parserOptions: {
                project: path.join(__dirname, "tsconfig.json"),
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
    },
    plugins: ["@typescript-eslint", "prettier"],
    extends: ["plugin:@typescript-eslint/recommended"],
    rules: {
        "no-nested-ternary": "off",
        "no-unused-vars": "off",
        "no-plusplus": [
            "error",
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-meaningless-void-operator": "warn",
        "@typescript-eslint/no-confusing-void-expression": "error",
        "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
        "@typescript-eslint/consistent-type-definitions": [1, "type"],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
            },
        ],
        "no-restricted-exports": "off",
        "no-restricted-imports": [
            "error",
            {
                patterns: ["../"],
            },
        ],
        eqeqeq: "error",
        "no-unneeded-ternary": "error",
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                prefer: "type-imports",
                fixStyle: "inline-type-imports",
            },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "import/prefer-default-export": "off",
        "arrow-body-style": "off",
    },
};

module.exports = config;
```

### 8. Conclusion

Congratulations! You've successfully set up a Node.js server with TypeScript and Zod for Express. This combination provides a strong foundation for building scalable and type-safe web applications. As you continue to develop, explore additional features of TypeScript and Zod to further enhance your server's capabilities. Happy coding!
