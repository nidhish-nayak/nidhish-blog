---
layout: "../../layouts/MarkdownPost.astro"
title: "JWT for authorization"
author: Nidhish
description: "Use cases of JWT and implementation of auth."
pubDate: 2023-12-29
readTime: "20 min read"
image:
    url: "https://ik.imagekit.io/fabric01/nid-blog/tszod.webp?updatedAt=1703758115117"
    alt: "JWT auth"
    lazyUrl: "https://ik.imagekit.io/fabric01/nid-blog/tszod_min.png?updatedAt=1703758114637"
tags: ["guide", "syntax", "node", "express", "jwt", "auth", "mongodb"]
---

# Introduction

We will be going through some topics on how authentication works using JWT. For beginners to understand the content easily, we will be using some raw-dog methods like localStorage to store and manage JWT tokens in the browser. Please note that we will be using localStorage for only learning purpose and in a real world application, httpOnly is used to store tokens in cookies. Now what is cookies and httpOnly? That is a talk for another time. But you will understand at the end of the post on why we use these methods and how it all actually works.

## Table of Contents

1. [JWT use cases](#1-jwt-use-cases)
2. [User Sign-Up](#2-user-sign-up)
3. [User Sign-In](#3-user-sign-in)
4. [JWT Token Generation](#4-jwt-token-generation)
5. [Storing Token in localStorage](#5-storing-token-in-localstorage)
6. [Persistent Authentication](#6-persistent-authentication)
7. [Conclusion](#7-conclusion)

### 1. JWT use cases

You may have heard of people using JWT (jsonwebtoken) for managing authentications in applications. You might think that it is used to secure your user data and passwords right? Wrong, JWT only handles the process of securely transmitting information between the client & server. The rest of the work is done by the server which you have written such as verifying if user is already present, if the password is valid, encrypting/hashing of passwords, saving user data to database, etc. Then you might think why use JWTs at all right?

Here are the reasons:

-   Persistant auth (User doesn't need to sign in everytime)
-   Token generated will be used for all the requests once logged in
-   Expiry time can be set on a token post which user will lose his access
-   No Server-Side Session Storage - all the necessary information is within the token
-   etc...

### 2. User Sign-Up

For starters, refer the below image to understand how sign-up works:

![sign-up](https://ik.imagekit.io/fabric01/nid-blog/signup.png?updatedAt=1703849675117)

Create a MongoDB model for the user and set up a route for user registration.

```javascript
// userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

```javascript
// signupRoute.js
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./userModel");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
```

### 3. User Sign-In

For the first sign-in, JWT is used to sign and generate a token for the access the user is going to use later. When the user is singed in, the token is then sent to frontend as given below:

![sign-in](https://ik.imagekit.io/fabric01/nid-blog/signin.png?updatedAt=1703849675601)

Implement the user sign-in route.

```javascript
// signinRoute.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./userModel");

const router = express.Router();

router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res
                .status(401)
                .json({ error: "Invalid username or password" });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ error: "Invalid username or password" });
        }

        // Sign a JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            "your-secret-key",
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
```

### 4. JWT Token Generation

The next process is explained in the diagram. You can follow the steps to understand how the auth token is stored in client and reused by server for other requests.

![jwt](https://ik.imagekit.io/fabric01/nid-blog/jwt.png?updatedAt=1703849676641)

Create a route middleware to verify the JWT token before accessing protected routes.

```javascript
// authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decodedToken = jwt.verify(token, "your-secret-key");
        req.userData = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = authMiddleware;
```

### 5. Storing Token in localStorage

Modify your sign-in route to include the JWT token in the response.

```javascript
// signinRoute.js
// ... (previous code)

router.post("/signin", async (req, res) => {
    try {
        // ... (previous code)

        // Sign a JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            "your-secret-key",
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ... (remaining code)
```

### 6. Persistent Authentication

Implement a route that checks for a valid token stored in localStorage on page load.

```javascript
// persistentAuthRoute.js
const express = require("express");
const authMiddleware = require("./authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
    // If the middleware passes, the user is authenticated
    res.json({ message: "You are authenticated!", userData: req.userData });
});

module.exports = router;
```

### 7. Conclusion

This is just the basics implemented using JWT authentication with Node.js, Express, MongoDB, and localStorage. This provides a foundation for building secure and scalable web applications. Remember to handle secret keys and sensitive information securely in a production environment. Only use localStorage for learning purpose with JWTs.

Happy coding!
