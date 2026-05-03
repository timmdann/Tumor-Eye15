# TumorEye'15

AI-powered brain MRI analysis for medical learning and support.

---

## Tech Stack

- **React 19** + **TypeScript** — UI
- **Vite** — build tool & dev server
- **Tailwind CSS v4** — styling
- **Redux Toolkit** — global state (analysis result, auth)
- **React Context** — theme (dark/light)
- **React Router v7** — navigation
- **Axios** — HTTP requests to Django backend
- **ESLint** — linting

---

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Button/         # Each component in its own folder
│   │   └── index.tsx
│   ├── Navbar/
│   │   └── index.tsx
│   └── ui/             # Small atomic elements (inputs, badges, etc.)
│
├── context/            # React Context providers
│   └── ThemeContext.tsx # Dark/light theme toggle
│
├── lib/                # Utilities and helpers
│   ├── api.ts          # Axios instance + API functions
│   └── hooks.ts        # Typed Redux hooks (useAppDispatch, useAppSelector)
│
├── pages/              # One file per route/page
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── doctor/
│   │   ├── Upload.tsx
│   │   ├── Result.tsx
│   │   └── Chat.tsx
│   └── student/
│       ├── Upload.tsx
│       └── Result.tsx
│
├── store/              # Redux store
│   ├── index.ts        # configureStore
│   └── slices/
│       ├── authSlice.ts      # role, isAuthenticated, username
│       └── analysisSlice.ts  # result, status, error
│
├── styles/             # Global styles (if split from index.css)
│
├── types/              # TypeScript interfaces
│   └── api.ts          # PredictResponse, Detection, UserRole
│
├── App.tsx             # Router + routes
├── main.tsx            # Entry point, providers
└── index.css           # Global CSS, CSS variables, animations
```

---

## Rules

### Where to put things

| What                       | Where                                           |
| -------------------------- | ----------------------------------------------- |
| New page                   | `src/pages/`                                    |
| Reusable component         | `src/components/` — own folder with `index.tsx` |
| Small atomic element       | `src/components/ui/`                            |
| API call                   | `src/lib/api.ts`                                |
| Redux state                | `src/store/slices/`                             |
| TypeScript type/interface  | `src/types/api.ts`                              |
| Global CSS variable        | `src/index.css` — `:root` block                 |
| Static files (images, svg) | `public/`                                       |

---

## Git Workflow

### Branch naming

| Type           | Pattern          | Example              |
| -------------- | ---------------- | -------------------- |
| New feature    | `feature/<name>` | `feature/login-page` |
| Bug fix        | `fix/<name>`     | `fix/navbar-overlap` |
| Documentation  | `docs/<name>`    | `docs/readme-update` |
| Config/tooling | `chore/<name>`   | `chore/eslint-setup` |

### Commit naming

| Type        | When to use                   | Example                                  |
| ----------- | ----------------------------- | ---------------------------------------- |
| `feat:`     | New feature                   | `feat: add doctor upload page`           |
| `fix:`      | Bug fix                       | `fix: correct image path in result`      |
| `style:`    | CSS/formatting only, no logic | `style: adjust navbar spacing`           |
| `refactor:` | Code change, no new feature   | `refactor: extract UploadZone component` |
| `docs:`     | Documentation only            | `docs: update README structure`          |

### Branch strategy

- `main` — production ready code only
- `dev` — main development branch, all features merge here first

### Workflow

1. Create branch from `dev`:

```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
```

2. Make changes, commit often with clear messages:

```bash
   git add .
   git commit -m "feat: add login form validation"
```

3. Push branch:

```bash
   git push origin feature/your-feature-name
```

4. Open Pull Request into `dev`
5. After review — merge and delete branch
6. `dev` → `main` only when releasing a stable version

---

## Running the project

```bash
# Install dependencies
npm install

# Start dev server (localhost:3000)
npm run dev

# Lint
npm run lint
```
