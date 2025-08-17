# hound-express-ts-react-redux

Plantilla **full-stack** con **Express + TypeScript** (API) y **React + Redux** (SPA). Ideal para arrancar proyectos con backend tipado y frontend con estado global, rutas y comunicación vía REST.

---

## 📌 Descripción

- **API (Express + TS):** rutas y controladores modulares, middlewares y tipado estático.
- **SPA (React + Redux):** manejo de estado con Redux Toolkit, páginas/vistas y consumo de API.
- **Objetivo:** ofrecer una base clara y escalable para productos Node/TS + React.

---

## 🛠️ Tecnologías

**Backend**
- Node.js · Express
- TypeScript
- (Opcional) Zod/Joi para validación
- (Opcional) Jest + Supertest para tests

**Frontend**
- React 18
- Redux Toolkit + react-redux
- React Router
- Vite o Create React App (según el repo)
- (Opcional) Vitest/RTL para tests

---

## 🚀 Instalación & arranque

Clona el repo:

```bash
git clone https://github.com/BenjaminMacias/hound-express-ts-react-redux.git
cd hound-express-ts-react-redux
1) Backend (API)
Nota: si tu carpeta se llama backend en lugar de server, ajusta el cd.







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
