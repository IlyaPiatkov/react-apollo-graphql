# React Apollo GraphQL Project

A modern web application built with React, Apollo Client, and GraphQL, featuring Material-UI components and TypeScript.

## Technology Stack

- **Frontend Framework**: React 19
- **API Integration**: Apollo Client 3.13
- **UI Framework**: Material-UI (MUI) 7.0
- **Type System**: TypeScript 5.7
- **Build Tool**: Vite 6.2
- **Form Handling**: React Hook Form 7.56
- **Routing**: React Router 7.6
- **GraphQL**: GraphQL 16.10
- **Styling**: Emotion (CSS-in-JS)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 20.19.2 or higher)
- npm (comes with Node.js) or yarn

## Getting Started

1. Clone the repository:
```bash
git clone [https://github.com/IlyaPiatkov/react-apollo-graphql.git]
cd react-apollo-graphql
```

2. Install dependencies:
```bash
npm install
# or if you use yarn
yarn
```

3. Start the development server:
```bash
npm run dev
# or if you use yarn
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Development

This project uses:
- TypeScript for type safety
- ESLint for code quality
- Material-UI components for the user interface
- Apollo Client for GraphQL integration
- React Router for navigation
- React Hook Form for form handling

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
