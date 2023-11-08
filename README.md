# Personal Blog

This is a personal blog website built using the Astro MPA (Multi Page Application) framework. This project is designed to help me create and manage my blog content efficiently, with a clean and minimalistic design. Whether you're a writer, blogger, or content creator, you can use this as a template.

![Desktop - 1](https://github.com/nidhish-nayak/nidhish-blog/assets/76598208/319ec7bb-c9bd-49b5-b536-9a0b73ca5732)

## Features

- **Astro MPA Framework:** Nidhish Blog is built on top of the Astro MPA framework, which allows for fast loading times and optimal performance.

- **Modular Components:** The project is structured with reusable and modular components, making it easy to add, edit, or customize the content.

- **Responsive Design:** The blog is designed to be responsive, ensuring a great user experience on various devices and screen sizes.

- **Markdown Support:** Write your blog posts using Markdown, a popular and easy-to-use markup language.

- **Tailwind CSS** Customize the styling of your blog with tailwindcss.

## Project Structure

Here's an overview of the project's directory structure:

```
nidhish-blog/
│
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   ├── social-image.png
│
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Button.jsx
│   │
│   ├── layouts/
│   │   ├── PostLayout.astro
│   │
│   ├── pages/
│   │   ├── posts/
│   │   │   ├── post1.md
│   │   │   ├── post2.md
│   │   │   ├── post3.md
│   │   ├── index.astro
│   │
│   ├── styles/
│   │   ├── global.css
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
```

## Getting Started

To get started with Nidhish Blog, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nidhish-nayak/nidhish-blog.git
   cd nidhish-blog
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the Development Server:**
   ```bash
   pnpm run dev
   ```

4. **Start Writing:**
   - Add your blog posts as Markdown files inside the `src/pages/posts` directory.
   - Customize the look and feel of your blog by editing the `global.css` file in the `src/styles` directory.
   - Modify or create components to suit your needs in the `src/components` directory.

5. **Build for Production:**
   When you're ready to deploy your blog, run the following command to build the project for production:
   ```bash
   pnpm run build
   ```

## Customization

Feel free to customize this project to your liking. Here are a few areas you can consider customizing:

- **Styling:** Edit the `global.css` file to change the colors, typography, and overall appearance of your blog.

- **Layout:** Modify the `PostLayout.astro` file to change the layout of individual blog posts.

- **Components:** Create new components or customize existing ones in the `src/components` directory.

## Feedback and Contributions

If you have any feedback, bug reports, or feature requests, please feel free to open an issue on this GitHub repository. Contributions are also welcome, so if you have ideas for improvements, don't hesitate to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Astro Starter Kit: Minimal

You can also use Astro starter kit to get a minimal blog template to start with.

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
