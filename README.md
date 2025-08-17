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

bash
Copiar
Editar
cd server
npm install
cp .env.example .env   # si existe; si no, crea .env
Ejemplo de .env:

env
Copiar
Editar
PORT=4000
NODE_ENV=development
# CORS_ORIGIN=http://localhost:5173   # o 3000 según tu frontend
# DB_URL=...                           # si usas BD
Arranque:

bash
Copiar
Editar
# desarrollo
npm run dev

# producción
npm run build
npm start
La API quedará en http://localhost:4000 (ajusta PORT si es necesario).

2) Frontend (SPA)
En otra terminal:

bash
Copiar
Editar
cd ../client   # o ../frontend
npm install
Configura la URL del backend (Vite o CRA):

env
Copiar
Editar
# Vite
VITE_API_URL=http://localhost:4000

# CRA
# REACT_APP_API_URL=http://localhost:4000
Arranque:

bash
Copiar
Editar
# Vite
npm run dev

# CRA
npm start
Frontend en http://localhost:5173 (Vite) o http://localhost:3000 (CRA).

▶️ Ejemplos de uso
Backend – endpoints de ejemplo
bash
Copiar
Editar
# Salud del servidor
curl http://localhost:4000/api/health
# -> { "status": "ok" }

# Recurso de ejemplo
curl http://localhost:4000/api/items
Frontend – llamada a la API
ts
Copiar
Editar
// client/src/api/items.ts
const API =
  import.meta.env.VITE_API_URL ||
  (process.env.REACT_APP_API_URL as string) ||
  "";

export async function getItems() {
  const res = await fetch(`${API}/api/items`);
  if (!res.ok) throw new Error("Error al obtener items");
  return res.json();
}
Redux Toolkit – slice mínimo
ts
Copiar
Editar
// client/src/store/itemsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItems } from "../api/items";

export const fetchItems = createAsyncThunk("items/fetch", getItems);

const itemsSlice = createSlice({
  name: "items",
  initialState: { data: [] as any[], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchItems.pending,  (s) => { s.loading = true; s.error = null; })
     .addCase(fetchItems.fulfilled,(s,a) => { s.loading = false; s.data = a.payload; })
     .addCase(fetchItems.rejected, (s,a) => { s.loading = false; s.error = a.error.message || "Error"; });
  }
});

export default itemsSlice.reducer;
Uso en un componente:

tsx
Copiar
Editar
// client/src/pages/Home.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/itemsSlice";

export default function Home() {
  const dispatch = useDispatch<any>();
  const { data, loading, error } = useSelector((s: any) => s.items);

  useEffect(() => { dispatch(fetchItems()); }, [dispatch]);

  if (loading) return <p>Cargando…</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map((it: any) => <li key={it.id}>{it.name}</li>)}
    </ul>
  );
}
🧩 Estructura sugerida
pgsql
Copiar
Editar
hound-express-ts-react-redux/
├─ server/                 # Express + TS (o backend/)
│  ├─ src/
│  │  ├─ app.ts
│  │  ├─ routes/
│  │  ├─ controllers/
│  │  └─ middlewares/
│  ├─ tests/
│  └─ tsconfig.json
└─ client/                 # React + Redux (o frontend/)
   ├─ src/
   │  ├─ api/
   │  ├─ store/
   │  ├─ pages/
   │  └─ App.tsx
   └─ vite.config.ts | package.json (CRA)
🧪 Scripts útiles
Backend

bash
Copiar
Editar
npm run dev     # desarrollo (ts-node/tsx)
npm run build   # compila TS
npm start       # producción
npm test        # si hay tests
Frontend

bash
Copiar
Editar
npm run dev     # Vite
npm start       # CRA
npm run build   # build de producción
npm test        # si hay tests
🔧 Troubleshooting
CORS bloqueado: asegúrate de que CORS_ORIGIN incluya la URL del frontend.

Variables de entorno: usa VITE_API_URL (Vite) o REACT_APP_API_URL (CRA).

Puertos: por defecto API en 4000 y frontend en 5173/3000.

📄 Licencia
MIT (o la que prefieras).

makefile
Copiar
Editar

::contentReference[oaicite:0]{index=0}






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
