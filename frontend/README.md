# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# KNN Frontend

React + TypeScript + Vite frontend for the KNN website.

## Features

- React 19 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API communication
- Admin dashboard for content management

## Pages

### Public Pages
- Sākumlapa (Home)
- Aktualitātes (News)
- Pakalpojumi (Services)
- Preces (Products)
- Par uzņēmumu (About)
- Saziņai (Contact)

### Admin Pages
- Admin Login
- Admin Dashboard
- Aktualitātes Management
- Produkti Management

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## API Integration

The frontend communicates with the Node.js API running on port 3000.
Admin credentials: admin1 / securepassword123

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
