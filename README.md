# TumorEye'15

AI-powered brain MRI analysis for medical learning and support.

🔗 **Live demo:** [https://tumor-eye15.vercel.app/](https://tumor-eye15.vercel.app/)

---

## Screenshots

### Landing

![Landing](docs/screenshots/landing.png)

### Login & Register

![Login](docs/screenshots/login.png)
![Register](docs/screenshots/register.png)

### Doctor — MRI Analysis

![Doctor Upload](docs/screenshots/doctor-upload.png)
![Doctor Result](docs/screenshots/doctor-result.png)
![Doctor Chat](docs/screenshots/doctor-chat.png)

### Student — MRI Practice

![Student Upload](docs/screenshots/student-upload.png)
![Student Result](docs/screenshots/student-result.png)

### Info Pages

![About Us](docs/screenshots/about.png)
![FAQ](docs/screenshots/faq.png)
![Terms of Service](docs/screenshots/terms.png)

---

## Pages & Routes

| Route             | Page                 | Access         |
| ----------------- | -------------------- | -------------- |
| `/`               | Landing              | Public         |
| `/login`          | Login                | Public         |
| `/register`       | Register             | Public         |
| `/profile`        | Profile              | Auth           |
| `/doctor/upload`  | Doctor MRI Analysis  | Auth (doctor)  |
| `/doctor/result`  | Doctor Result        | Auth (doctor)  |
| `/doctor/chat`    | AI Chat Assistant    | Auth (doctor)  |
| `/student/upload` | Student MRI Practice | Auth (student) |
| `/student/result` | Student Result       | Auth (student) |
| `/about`          | About Us             | Public         |
| `/faq`            | FAQ                  | Public         |
| `/terms`          | Terms of Service     | Public         |
| `*`               | 404 Not Found        | Public         |

---

## Authentication

Authentication is handled by **Supabase** (Email/Password).  
User role (`doctor` | `student`) is stored in `user_metadata` at registration and used on login to redirect to the correct workflow.

---

## Analytics

### Google Analytics 4

Initialized via `gtag.js` in `index.html` (Measurement ID: `G-S8FJQMSGGP`).  
Route changes tracked automatically via `AnalyticsListener` component inside `BrowserRouter`.

![Google Analytics](docs/screenshots/analytics-ga.png)

### ContentSquare (Hotjar)

Tracking script injected in `index.html`. **Tracking URL changes: ENABLED** — automatically captures SPA route transitions.

![ContentSquare Dashboard](docs/screenshots/analytics-hotjar.png)

---

## Tech Stack

- **React 19** + **TypeScript** — UI
- **Vite** — build tool & dev server
- **Tailwind CSS v4** — styling
- **Redux Toolkit** — global state (analysis result, auth)
- **React Context** — theme (dark/light)
- **React Router v7** — navigation
- **Supabase** — authentication (Email/Password, user metadata)
- **Axios** — HTTP requests to AI analysis backend
- **ESLint** — linting

---

## Project Structure

```
src/
├── components/                   # Reusable UI — each in its own folder
│   ├── AnalyticsListener/        # GA4 route change tracker
│   ├── AuthSidebar/              # Sidebar shared by Login, Register, Profile
│   ├── BrainImage/               # Animated brain MRI with levitate + shadow
│   ├── Button/                   # Generic button (variant: panel | accent)
│   ├── ChatInput/                # Chat text input + send button
│   ├── ChatMessage/              # Single chat bubble (user | assistant)
│   ├── ErrorMessage/             # Auth error display
│   ├── FAQItem/                  # Accordion item for FAQ page
│   ├── FormInput/                # Labelled text input with animation
│   ├── Navbar/                   # Top-right nav panel (landing page)
│   ├── PageNav/                  # Top-right nav panel (info pages)
│   ├── PasswordInput/            # Password field with show/hide toggle
│   ├── RoleButton/               # Doctor / Student role selector
│   ├── ThemeIcon/                # Sun / Moon SVG icon
│   ├── TopPanel/                 # Theme toggle panel (auth pages)
│   ├── AppPanelLayout/           # Layout wrapper for Doctor/Student app
│   ├── AdjustmentsPanel/         # Image adjustment sliders (doctor)
│   ├── AnalyzingScreen/          # Full-screen loading state
│   ├── DoctorImagePreview/       # MRI image with detection overlay
│   ├── DoctorResultSidebar/      # Analysis result actions sidebar
│   ├── DoctorUploadArea/         # Drag & drop upload zone (doctor)
│   ├── ExerciseSidebar/          # Student annotation controls
│   ├── MiniDetectionBox/         # Small detection box in chat preview
│   ├── StudentImagePreview/      # MRI image with student annotation
│   ├── StudentResultSidebar/     # Comparison result sidebar (student)
│   ├── StudentUploadArea/        # Upload zone (student)
│   ├── InfoBlock/                # Text block used on About page
│   ├── PageFooter/               # Page footer
│   └── TypingDots/               # Animated dots for AI typing state
│
├── context/
│   └── ThemeContext.tsx          # Dark/light theme — persisted in localStorage
│
├── data/                         # Static constants and content
│   ├── navLinks.ts               # Navigation link arrays per page
│   ├── faqItems.ts               # FAQ questions & answers
│   ├── termsData.ts              # Terms of Service sections
│   ├── detectionData.ts          # AI detection box coordinates
│   ├── howItWorks.ts
│   ├── mriItems.ts
│   ├── textTypeItems.ts
│   └── trustStats.ts
│
├── lib/
│   ├── hooks.ts                  # useAppDispatch, useAppSelector
│   ├── supabase.ts               # Supabase client
│   ├── hooks/
│   │   ├── useDoctorAnalysis.ts  # Doctor upload/adjust/result flow
│   │   ├── useDoctorChat.ts      # AI chat logic
│   │   ├── useStudentAnalysis.ts # Student upload/exercise/result flow
│   │   └── usePasswordToggle.ts
│   └── utils/
│       ├── chatSimulator.ts
│       ├── reportImage.ts
│       └── selectionBox.ts
│
├── pages/                        # One file per route
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Profile.tsx
│   ├── DoctorAnalysis.tsx
│   ├── DoctorChat.tsx
│   ├── StudentAnalysis.tsx
│   ├── AboutUs.tsx
│   ├── FAQ.tsx
│   ├── TermsOfService.tsx
│   └── NotFound.tsx
│
├── store/
│   ├── index.ts                  # configureStore
│   └── slices/
│       └── authSlice.ts          # role, isAuthenticated, username, email
│
├── types/
│   └── api.ts                    # PredictResponse, Detection, UserRole
│
├── App.tsx                       # BrowserRouter + AnimatedRoutes + AnalyticsListener
├── main.tsx                      # Entry point, Redux + ThemeProvider
└── index.css                     # Tailwind v4, CSS variables, animations
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
   - Add teammates as **Reviewers**
   - PR should not be merged without at least 1 approval
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
