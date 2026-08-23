# VRMM — Repository Structure

> Virtual Research Match Maker · Spring Boot + React + PostgreSQL  
> Full annotated map of every file and folder in the repository.

---

## Tree Overview

```
Virtual-Research-Matcher-1/
├── CLAUDE.md
├── STRUCTURE.md
├── README.md
├── plan.md
│
├── deploy/
│   ├── env.example
│   ├── nginx-vrmm.conf
│   └── vrmm.service
│
├── backend/
│   └── backend/
│       ├── .env
│       ├── .env.example
│       ├── .gitattributes
│       ├── .gitignore
│       ├── HELP.md
│       ├── mvnw
│       ├── mvnw.cmd
│       ├── pom.xml
│       └── src/
│           ├── main/
│           │   ├── java/com/vrm/backend/
│           │   │   ├── BackendApplication.java
│           │   │   ├── config/
│           │   │   │   ├── ApplicationConfiguration.java
│           │   │   │   ├── EmailConfiguration.java
│           │   │   │   ├── GlobalExceptionHandler.java
│           │   │   │   ├── JwtAuthenticationFilter.java
│           │   │   │   └── SecurityConfiguration.java
│           │   │   ├── controller/
│           │   │   │   ├── ApplicationController.java
│           │   │   │   ├── AuthenticationController.java
│           │   │   │   ├── PostingController.java
│           │   │   │   ├── UserController.java
│           │   │   │   └── UserInfoController.java
│           │   │   ├── dto/
│           │   │   │   ├── ApplicationDto.java
│           │   │   │   ├── ChangePasswordDto.java
│           │   │   │   ├── CreatePostingDto.java
│           │   │   │   ├── ForgotPasswordDto.java
│           │   │   │   ├── LoginUserDto.java
│           │   │   │   ├── RegisterUserDto.java
│           │   │   │   ├── ResetPasswordDto.java
│           │   │   │   ├── StatusUpdateDto.java
│           │   │   │   ├── UpdateUserInfoDto.java
│           │   │   │   └── VerifyUserDto.java
│           │   │   ├── model/
│           │   │   │   ├── Application.java
│           │   │   │   ├── Experience.java
│           │   │   │   ├── Posting.java
│           │   │   │   ├── User.java
│           │   │   │   └── UserInfo.java
│           │   │   ├── repository/
│           │   │   │   ├── ApplicationRepository.java
│           │   │   │   ├── PostingRepository.java
│           │   │   │   ├── UserInfoRepository.java
│           │   │   │   └── UserRepository.java
│           │   │   ├── responses/
│           │   │   │   ├── ApplicationResponse.java
│           │   │   │   ├── LoginResponse.java
│           │   │   │   ├── PostingResponse.java
│           │   │   │   ├── RegisterResponse.java
│           │   │   │   └── UserInfoResponse.java
│           │   │   └── service/
│           │   │       ├── ApplicationService.java
│           │   │       ├── AuthenticationService.java
│           │   │       ├── EmailService.java
│           │   │       ├── JWTService.java
│           │   │       ├── PostingService.java
│           │   │       ├── UserInfoService.java
│           │   │       └── UserService.java
│           │   └── resources/
│           │       ├── application.properties
│           │       └── application-prod.properties
│           └── test/
│               └── java/com/vrm/backend/
│                   └── BackendApplicationTests.java
│
└── frontend/
    └── vrmfrontend/
        ├── .env
        ├── .env.example
        ├── .gitignore
        ├── eslint.config.js
        ├── index.html
        ├── package.json
        ├── package-lock.json
        ├── postcss.config.js
        ├── README.md
        ├── tailwind.config.js
        ├── tsconfig.json
        ├── tsconfig.app.json
        ├── tsconfig.node.json
        ├── vite.config.ts
        ├── public/
        │   └── vite.svg
        └── src/
            ├── App.tsx
            ├── index.css
            ├── main.tsx
            ├── components/
            │   ├── layout/
            │   │   ├── DashboardLayout.tsx
            │   │   ├── DashboardSidebar.tsx
            │   │   ├── DashboardTopbar.tsx
            │   │   ├── Footer.tsx
            │   │   ├── PublicLayout.tsx
            │   │   └── PublicNavbar.tsx
            │   ├── ui/
            │   │   ├── button.tsx
            │   │   ├── input.tsx
            │   │   ├── label.tsx
            │   │   ├── sonner.tsx
            │   │   ├── textarea.tsx
            │   │   └── tooltip.tsx
            │   ├── MetricCard.tsx
            │   ├── NavLink.tsx
            │   ├── ProjectCard.tsx
            │   ├── StatusBadge.tsx
            │   └── ThemeToggle.tsx
            ├── context/
            │   ├── AuthContext.tsx
            │   └── ThemeContext.tsx
            ├── data/
            │   └── mockData.ts
            ├── hooks/
            │   ├── use-mobile.tsx
            │   └── useTheme.ts
            ├── lib/
            │   ├── api.ts
            │   ├── postingUtils.ts
            │   ├── profileUtils.ts
            │   └── utils.ts
            ├── pages/
            │   ├── NotFound.tsx
            │   ├── auth/
            │   │   ├── AuthPages.tsx
            │   │   ├── EmailVerification.tsx
            │   │   ├── ForgotPassword.tsx
            │   │   ├── Login.tsx
            │   │   ├── Register.tsx
            │   │   └── ResetPassword.tsx
            │   ├── dashboard/
            │   │   ├── shared/
            │   │   │   ├── BrowseProjects.tsx
            │   │   │   ├── EditProfile.tsx
            │   │   │   ├── Profile.tsx
            │   │   │   ├── PublicProfile.tsx
            │   │   │   ├── SettingsPage.tsx
            │   │   │   └── ViewPosting.tsx
            │   │   ├── student/
            │   │   │   ├── ApplicationPage.tsx
            │   │   │   ├── MyApplications.tsx
            │   │   │   ├── StudentDashboard.tsx
            │   │   │   └── ViewApplication.tsx
            │   │   └── researcher/
            │   │       ├── CreatePosting.tsx
            │   │       ├── EditPosting.tsx
            │   │       ├── MyPostings.tsx
            │   │       ├── ResearcherDashboard.tsx
            │   │       ├── ResearcherViewApplication.tsx
            │   │       └── ViewApplicants.tsx
            │   └── public/
            │       ├── About.tsx
            │       ├── Documentation.tsx
            │       ├── FAQ.tsx
            │       ├── Landing.tsx
            │       ├── PrivacyPolicy.tsx
            │       ├── Support.tsx
            │       └── TermsOfService.tsx
            └── routes/
                └── ProtectedRoutes.tsx
```

---

## Root Level

| File / Folder | Purpose |
|---|---|
| `CLAUDE.md` | Project context and deployment instructions read by Claude Code at the start of every session. Describes the architecture, deployment target (Western University VM), and SSO migration plan. |
| `STRUCTURE.md` | This file. Full annotated map of every file and folder in the repository. |
| `README.md` | Top-level repository overview. |
| `plan.md` | Development planning notes used during early-stage feature planning. |
| `deploy/` | Production deployment configuration files. None of these run locally — they are copied to the Ubuntu VM during deployment. |
| `backend/` | Spring Boot REST API. The actual Maven project lives one level deeper at `backend/backend/`. |
| `frontend/` | React + TypeScript frontend. The actual Vite project lives one level deeper at `frontend/vrmfrontend/`. |

---

## `deploy/`

Deployment artifacts for the production Ubuntu VM. These are templates — copy them to the server and fill in the blanks.

| File | Purpose |
|---|---|
| `env.example` | Template for the production secrets file that lives at `/opt/vrmm/.env` on the server. Contains placeholder values for database credentials, JWT secret, email credentials, and CORS settings. Never commit a version with real values. |
| `nginx-vrmm.conf` | Nginx site configuration for `vrmm.eng.uwo.ca`. Handles three jobs: (1) redirect HTTP → HTTPS, (2) serve the compiled React `dist/` folder as static files with React Router fallback, (3) reverse-proxy all `/api/` requests to Spring Boot on `127.0.0.1:8080`. Has `TODO` placeholders for SSL certificate paths provided by Engineering IT. |
| `vrmm.service` | systemd unit file. Tells the Linux service manager to run the Spring Boot JAR as a background daemon under a restricted `vrmm` user, load secrets from `/opt/vrmm/.env`, start with `--spring.profiles.active=prod`, and auto-restart on failure or server reboot. |

---

## `backend/backend/`

The Spring Boot Maven project root.

| File | Purpose |
|---|---|
| `.env` | Local development environment variables. Loaded by Spring Boot via `spring.config.import`. Contains dev database URL, JWT secret, email credentials. **Not committed with real values.** |
| `.env.example` | Documents every required environment variable for local dev setup. Safe to commit — contains no real secrets. |
| `.gitattributes` | Enforces consistent line endings (LF) across operating systems, especially for the `mvnw` shell script. |
| `.gitignore` | Excludes `target/`, IDE files, and the `.env` file from version control. |
| `HELP.md` | Auto-generated by Spring Initializr. Links to Spring Boot docs and getting-started guides. |
| `mvnw` | Maven wrapper shell script for Unix/macOS. Run `./mvnw clean package` to build the JAR without needing Maven installed globally. |
| `mvnw.cmd` | Maven wrapper for Windows CMD. Equivalent of `mvnw` for Windows environments. |
| `pom.xml` | Maven project descriptor. Declares all dependencies (Spring Boot, Spring Security, Spring Data JPA, PostgreSQL driver, JWT, Jakarta Validation, Lombok, JavaMail), the Java version (21), and the build plugin that packages the fat JAR. |

---

### `src/main/java/com/vrm/backend/`

#### Root

| File | Purpose |
|---|---|
| `BackendApplication.java` | The `@SpringBootApplication` entry point. Running this class starts the embedded Tomcat server and bootstraps the entire Spring context. |

---

#### `config/`

Spring configuration and security infrastructure. These classes wire together the framework internals.

| File | Purpose |
|---|---|
| `ApplicationConfiguration.java` | Defines core Spring Security beans: `UserDetailsService` (loads users from the DB by email), `BCryptPasswordEncoder` (hashes passwords), `AuthenticationManager`, and `DaoAuthenticationProvider`. These beans are injected throughout the security layer. |
| `EmailConfiguration.java` | Configures the `JavaMailSender` bean using SMTP properties from `application.properties` (Gmail SMTP, port 587, STARTTLS). Used by `EmailService` to send verification and reset emails. |
| `GlobalExceptionHandler.java` | `@ControllerAdvice` class that catches `RuntimeException` globally and returns a structured HTTP error response. Prevents Spring's default HTML error page from reaching the frontend. |
| `JwtAuthenticationFilter.java` | `OncePerRequestFilter` that runs on every request. Reads the `Authorization: Bearer <token>` header, validates the JWT via `JWTService`, loads the user from the DB, and sets the `SecurityContextHolder` so Spring Security knows who is making the request. |
| `SecurityConfiguration.java` | Configures the HTTP security chain: disables CSRF (stateless JWT API), configures CORS allowed origins, sets session management to `STATELESS`, defines which endpoints are public vs. authenticated vs. role-gated, and registers `JwtAuthenticationFilter` before Spring's built-in auth filter. |

---

#### `controller/`

REST API endpoints. Each controller maps HTTP routes to service calls and returns JSON responses.

| File | Purpose |
|---|---|
| `ApplicationController.java` | Handles application lifecycle. Routes: `POST /applications` (submit), `GET /applications/my` (student's own), `GET /applications/:id` (one application), `GET /applications/:id/applications` (all for a posting), `GET /applications/:id/researcher-view` (researcher detail view), `PATCH /applications/:id/status` (accept/reject/reset), `PATCH /applications/:id/withdraw` (student withdraw). |
| `AuthenticationController.java` | Handles the full auth flow. Routes: `POST /auth/register`, `POST /auth/login`, `POST /auth/verify`, `POST /auth/resend`, `POST /auth/forgot-password`, `POST /auth/reset-password`. Returns JWT on successful login. |
| `PostingController.java` | Handles research postings. Routes: `GET /postings` (all, public), `GET /postings/:id` (one), `GET /postings/my` (researcher's own), `POST /postings` (create), `PUT /postings/:id` (update), `DELETE /postings/:id` (delete — also deletes child applications). |
| `UserController.java` | Handles the authenticated user's account. Routes: `GET /users/me` (current user), `PATCH /users/change-password`. |
| `UserInfoController.java` | Handles extended profile data. Routes: `GET /users/me/profile` (own profile), `PUT /users/me/profile` (update own profile), `GET /users/:id/profile` (any user's public profile). |

---

#### `dto/`

Data Transfer Objects — classes that define the shape of incoming request bodies. Annotated with Jakarta validation constraints (`@NotBlank`, `@Email`, etc.) to reject malformed requests at the controller layer.

| File | Purpose |
|---|---|
| `ApplicationDto.java` | Input for submitting an application: `postingId`, `coverLetter`, `why`, `experience`. |
| `ChangePasswordDto.java` | Input for the change-password endpoint: `currentPassword`, `newPassword`. |
| `CreatePostingDto.java` | Input for creating or updating a posting: title, type, description, deadline, location, duration, openPositions, stipend, requirements, tags. |
| `ForgotPasswordDto.java` | Input for the forgot-password endpoint: `email`. |
| `LoginUserDto.java` | Input for login: `email` (validated as email format), `password` (not blank). |
| `RegisterUserDto.java` | Input for registration: `email`, `password`, `firstName`, `lastName`, `role` (STUDENT or RESEARCHER). |
| `ResetPasswordDto.java` | Input for resetting a password: `token` (from the reset email link), `newPassword`. |
| `StatusUpdateDto.java` | Input for updating an application's status: `status` (ACCEPTED, REJECTED, or PENDING). |
| `UpdateUserInfoDto.java` | Input for profile updates: `headline`, `bio`, `location`, `university`, `department`, `githubUrl`, `linkedinUrl`, `websiteUrl`, `skills` (list), `experiences` (list). |
| `VerifyUserDto.java` | Input for email verification: `email`, `verificationCode` (validated as 6-digit number). |

---

#### `model/`

JPA entity classes. Each maps directly to a PostgreSQL table. Hibernate manages the schema based on these classes.

| File | Purpose |
|---|---|
| `User.java` | Core user entity. Fields: `id`, `email` (unique), `password` (bcrypt hash), `role` (enum: STUDENT / RESEARCHER), `firstName`, `lastName`, `verificationCode`, `verificationExpired`, `enabled`. Implements `UserDetails` for Spring Security. |
| `UserInfo.java` | Extended profile entity linked 1:1 with `User`. Fields: `headline`, `bio`, `location`, `university`, `department`, `githubUrl`, `linkedinUrl`, `websiteUrl`, `skills` (text array). Has a one-to-many relationship with `Experience`. |
| `Experience.java` | A single work or research experience entry. Fields: `title`, `company`, `beginDate`, `endDate`, `description`. Belongs to a `UserInfo`. |
| `Posting.java` | A research opportunity posted by a researcher. Fields: `title`, `type` (PROJECT/POSITION), `description`, `applicationDeadline`, `location`, `duration`, `openPositions`, `stipend`, `requirements`, `tags` (text array). Many-to-one with `User` (createdBy). |
| `Application.java` | A student's application to a posting. Fields: `coverLetter`, `why`, `experience`, `status` (PENDING/ACCEPTED/REJECTED/WITHDRAWN), `createdAt`. Many-to-one with both `User` (applicant) and `Posting`. |

---

#### `repository/`

Spring Data JPA interfaces. Extend `JpaRepository` for free CRUD methods. Custom query methods are derived from method names by Spring.

| File | Purpose |
|---|---|
| `UserRepository.java` | Queries for `User`. Custom methods: `findByEmail(String)`, `findByVerificationCode(String)`. |
| `UserInfoRepository.java` | Queries for `UserInfo`. Custom methods: `findByUserId(Long)`. |
| `PostingRepository.java` | Queries for `Posting`. Custom methods: `findByCreatedById(Long)` to get a researcher's own postings. |
| `ApplicationRepository.java` | Queries for `Application`. Custom methods: `findByApplicantId(Long)`, `findByPostingId(Long)`, `deleteByPostingId(Long)` (used when deleting a posting to avoid FK constraint violations). |

---

#### `responses/`

Response objects — the shapes of data sent back to the frontend. Separate from entities to allow projection (joining names, excluding sensitive fields like password hashes).

| File | Purpose |
|---|---|
| `LoginResponse.java` | Wraps the JWT string returned after a successful login: `{ token: "..." }`. |
| `RegisterResponse.java` | Confirmation payload returned after a successful registration. |
| `PostingResponse.java` | Full posting data for the frontend, including the researcher's full name via a join — entities don't expose this directly. |
| `ApplicationResponse.java` | Application data for the frontend. Includes `applicantFirstName`, `applicantLastName`, `applicantEmail`, `postingTitle`, `status`, `createdAt`. |
| `UserInfoResponse.java` | Full profile data returned to the frontend: all `UserInfo` fields, experiences list, and the user's `email`, `firstName`, `lastName`, `role` from the linked `User`. |

---

#### `service/`

Business logic layer. Controllers delegate to services, which coordinate between repositories and other services.

| File | Purpose |
|---|---|
| `AuthenticationService.java` | Core auth logic: `signup()` (creates user, sends verification email), `authenticate()` (validates password), `verifyUser()` (checks 6-digit code and marks user enabled), `resendVerificationCode()`, `forgotPassword()` (generates reset token, sends email), `resetPassword()` (validates token, updates password). Uses `SecureRandom` for verification codes. |
| `JWTService.java` | JWT operations: `generateToken(User)` creates a signed JWT with email as subject and a configurable expiry. `extractUsername(token)` and `isTokenValid(token, user)` are used by the auth filter. Uses the `JWT_SECRET` env var as the signing key. |
| `EmailService.java` | Thin wrapper around `JavaMailSender`. Single method: `sendVerificationEmail(to, subject, htmlBody)`. Sends multipart HTML emails. |
| `UserService.java` | Minimal service for user lookup: `getUserById(Long)` used when loading a public profile by ID. |
| `UserInfoService.java` | Profile data logic: `getOrCreateUserInfo(user)` (lazy-creates a UserInfo if one doesn't exist), `getUserInfo(user)`, `updateUserInfo(user, dto)` (replaces skills, syncs experience entries). Builds `UserInfoResponse` for the API. |
| `PostingService.java` | Posting CRUD logic: create, read, update. `deletePosting()` is `@Transactional` — deletes all child applications via `applicationRepository.deleteByPostingId()` before deleting the posting, avoiding FK constraint errors. |
| `ApplicationService.java` | Application logic: `createApplication()` (prevents duplicate applications), retrieve by applicant or posting, `updateApplicationStatus()`, `withdrawApplication()`. |

---

#### `src/main/resources/`

| File | Purpose |
|---|---|
| `application.properties` | Base Spring Boot configuration loaded in all environments. All sensitive values are read from environment variables (`${VAR_NAME}`). Configures: datasource, JPA dialect, JWT, Gmail SMTP, CORS allowed origins, frontend URL. Also imports a local `.env` file for dev convenience via `spring.config.import`. |
| `application-prod.properties` | Production-only overrides, activated by `--spring.profiles.active=prod`. Sets `server.servlet.context-path=/api` (so Nginx can cleanly proxy `/api/` traffic), explicitly sets `ddl-auto=validate` (no automatic DB migration in production), and contains commented-out placeholder properties for Western University OIDC/SSO credentials. |

---

#### `src/test/`

| File | Purpose |
|---|---|
| `BackendApplicationTests.java` | Spring Boot context load test auto-generated by Spring Initializr. Verifies the application context starts without errors. Acts as a smoke test for bean wiring. |

---

## `frontend/vrmfrontend/`

The Vite + React + TypeScript project root.

| File | Purpose |
|---|---|
| `.env` | Local development environment variables. Currently only `VITE_API_URL=http://localhost:8080` — points the Axios client at the local Spring Boot instance. **Not committed with real values.** |
| `.env.example` | Documents required env vars. Notes that production should use `VITE_API_URL=https://vrmm.eng.uwo.ca/api` to match the Nginx proxy and Spring Boot context path. |
| `.gitignore` | Excludes `node_modules/`, `dist/`, and `.env` from version control. |
| `eslint.config.js` | ESLint configuration for TypeScript and React. Enforces code style rules during development. |
| `index.html` | The single HTML file Vite uses as the entry point. Contains `<div id="root">` where React mounts, and a `<script>` tag that Vite replaces with the bundled JavaScript at build time. |
| `package.json` | NPM project manifest. Lists all dependencies (React, React Router, Axios, TanStack Query, React Hook Form, shadcn/ui, Tailwind, Lucide, Sonner, jwt-decode) and scripts: `dev`, `build`, `lint`. |
| `package-lock.json` | Locked exact dependency versions. Ensures reproducible installs across environments. |
| `postcss.config.js` | PostCSS configuration. Enables the Tailwind CSS plugin and Autoprefixer so Tailwind utility classes are processed at build time. |
| `README.md` | Default Vite project README. Can be ignored. |
| `tailwind.config.js` | Tailwind CSS configuration. Specifies which files Tailwind should scan for class names (`src/**`) and extends the default theme with custom design tokens that match the CSS variables in `index.css`. |
| `tsconfig.json` | Root TypeScript configuration that references the two sub-configs below. |
| `tsconfig.app.json` | TypeScript config for application source files. Enables strict mode, JSX transform for React, and module resolution settings. |
| `tsconfig.node.json` | TypeScript config for Vite's own config file (`vite.config.ts`). Runs in a Node.js context rather than the browser. |
| `vite.config.ts` | Vite bundler configuration. Registers the React plugin (`@vitejs/plugin-react`) and can define dev server settings. |

---

### `public/`

Static assets served at the root URL without processing.

| File | Purpose |
|---|---|
| `vite.svg` | Default Vite logo included by the scaffold. Not used in the VRMM application. |

---

### `src/`

#### Root source files

| File | Purpose |
|---|---|
| `main.tsx` | React DOM entry point. Mounts `<App />` into `#root` with `React.StrictMode`. |
| `App.tsx` | Root application component. Sets up global providers (`QueryClientProvider`, `AuthProvider`, `TooltipProvider`, `Sonner`), `BrowserRouter`, and defines the complete route tree — public routes under `PublicLayout`, auth routes standalone, and dashboard routes guarded by `ProtectedRoute` with role-based access. |
| `index.css` | Global stylesheet. Contains Tailwind directives, CSS custom properties (design tokens: `--primary` navy, `--background`, `--border`, etc.) for light and dark themes, and reusable utility classes like `.vrmm-card` (bordered card), `.tag-chip` (skill badge), and `.fade-in` (entry animation). |

---

### `src/components/`

Reusable UI components shared across multiple pages.

#### `layout/`

Structural layout wrappers that compose the page shells.

| File | Purpose |
|---|---|
| `PublicLayout.tsx` | Layout for unauthenticated pages. Renders `PublicNavbar` at the top, the matched route's page via `<Outlet />` in the middle, and `Footer` at the bottom. |
| `PublicNavbar.tsx` | Navigation bar for public pages. Shows the VRMM logo, nav links (Browse, About), and Sign In / Get Started buttons. |
| `Footer.tsx` | Site-wide footer. Three-column link grid (Platform, Resources, Legal) with real React Router `<Link>` navigation to all informational pages, plus a copyright line and social icon placeholders. |
| `DashboardLayout.tsx` | Authenticated layout shell. Renders `DashboardSidebar` on the left and a main content area on the right containing `DashboardTopbar` and the current `<Outlet />`. |
| `DashboardSidebar.tsx` | Left navigation panel for the authenticated dashboard. Renders role-aware nav items — students see Browse and My Applications; researchers see My Postings and Create Posting. Both roles see Profile and Settings. Uses `NavLink` for active-state highlighting. |
| `DashboardTopbar.tsx` | Top bar within the dashboard. Displays the current user's name and role, and a logout button that clears the JWT and redirects to login. |

---

#### `ui/`

Primitive UI components from the shadcn/ui library. These are owned copies (not an npm package) so they can be customized. They wrap Radix UI primitives and apply Tailwind styles.

| File | Purpose |
|---|---|
| `button.tsx` | Button with variants (`default`, `outline`, `ghost`, `destructive`) and sizes (`sm`, `default`, `lg`, `icon`). Composed via `class-variance-authority`. |
| `input.tsx` | Styled single-line text input. Applies focus ring, border, and background using CSS variables. |
| `label.tsx` | Form label element with appropriate font weight and `for` attribute wiring. |
| `sonner.tsx` | Toast notification system. Wraps the Sonner library's `<Toaster>` and applies the active color theme. Used for success/error feedback throughout the app. |
| `textarea.tsx` | Styled multi-line text input. Matches the `input.tsx` styling. |
| `tooltip.tsx` | Radix UI tooltip primitive for hover hints. Used sparingly for icon-only buttons. |

---

#### Shared components

| File | Purpose |
|---|---|
| `MetricCard.tsx` | Dashboard stat tile. Accepts a `label`, numeric `value`, and a Lucide `icon`. Renders a bordered card with the icon, value prominently, and label below. Used on both dashboards for at-a-glance metrics. |
| `NavLink.tsx` | Navigation link for the dashboard sidebar. Detects the current route via `useMatch` and applies an active highlight style. Accepts an icon and label. |
| `ProjectCard.tsx` | Card for a research posting in the browse grid. Shows title, researcher name, deadline, location, type badge, and up to 3 tags. Clicking navigates to the full posting view. |
| `StatusBadge.tsx` | Colored inline badge for status values. Maps status strings (`open`, `closed`, `pending`, `accepted`, `rejected`, `withdrawn`) to distinct color variants using Tailwind classes. |
| `ThemeToggle.tsx` | Icon button that calls `ThemeContext` to switch between light and dark mode. Renders a sun or moon icon depending on the current theme. |

---

### `src/context/`

React Context providers that hold global state accessible throughout the component tree.

| File | Purpose |
|---|---|
| `AuthContext.tsx` | The central authentication context. Stores the JWT, decodes it with `jwt-decode` to extract `role` and `email`, and exposes `login(token, rememberMe)` and `logout()`. On login, saves the token to `localStorage` (if rememberMe) or `sessionStorage`. Reads the token on mount to restore session. Exposes `isLoggedIn`, `role`, `email`. |
| `ThemeContext.tsx` | Manages the light/dark theme. Reads the user's saved preference from `localStorage` on mount, applies it by setting `data-theme` on `<html>`, and exposes `theme` and `toggleTheme()`. The CSS custom properties in `index.css` respond to this attribute. |

---

### `src/data/`

| File | Purpose |
|---|---|
| `mockData.ts` | Static mock data used during early development before the backend API was connected. May still be referenced by components that haven't been fully wired to real API calls. |

---

### `src/hooks/`

Custom React hooks for reusable stateful logic.

| File | Purpose |
|---|---|
| `use-mobile.tsx` | Returns `true` if the viewport width is below a mobile breakpoint threshold (~768px). Used to conditionally render mobile-friendly layouts. |
| `useTheme.ts` | Reads from `ThemeContext` and applies the theme to the document root. Called once in `App.tsx` to ensure the theme is active from the first render. |

---

### `src/lib/`

Utility modules and the configured API client.

| File | Purpose |
|---|---|
| `api.ts` | Pre-configured Axios instance. Sets `baseURL` from `import.meta.env.VITE_API_URL`. Attaches a request interceptor that reads the JWT from storage and adds `Authorization: Bearer <token>` to every outgoing request automatically. All API calls in the app use this instance. |
| `postingUtils.ts` | Shared utility for posting status logic. `isOpen(deadline: string): boolean` returns `true` if the deadline date is in the future. Used by both the researcher dashboard and the browse page to determine open/closed badge state. |
| `profileUtils.ts` | Shared utilities for user profiles. `normalizeUrl(url: string): string` ensures URLs have a protocol prefix (`https://`) so they work as `<a href>` values. Also exports the `UserInfoResponse` TypeScript type shared between `Profile.tsx` and `PublicProfile.tsx`. |
| `utils.ts` | General utility. Contains `cn(...classes)` — the shadcn/ui class merging helper built on `clsx` and `tailwind-merge`. Used by all UI components to conditionally combine Tailwind class names safely. |

---

### `src/pages/`

All route-level page components, organized by access level.

#### Root

| File | Purpose |
|---|---|
| `NotFound.tsx` | Rendered for any URL that doesn't match a defined route (`path="*"`). Shows a 404 message with a link back to the homepage. |

---

#### `auth/`

Authentication flow pages. Rendered without a layout wrapper (no navbar/footer).

| File | Purpose |
|---|---|
| `AuthPages.tsx` | Shared layout component (`AuthCard`) used by all auth pages. Provides the centered card container, title, subtitle text, and a footer slot for "already have an account?" links. Keeps auth page structure consistent. |
| `Login.tsx` | Sign-in form. Validates email/password with React Hook Form. Handles the "not verified" error state by showing a resend verification email button. On success, calls `AuthContext.login()` and navigates to the appropriate dashboard. |
| `Register.tsx` | Registration form. Collects email, first name, last name, password, and role selection (Student or Researcher). On success, redirects to email verification. |
| `EmailVerification.tsx` | Prompts the user to enter the 6-digit code emailed after registration. Supports resending the code. On successful verification, redirects to login. |
| `ForgotPassword.tsx` | Collects an email address and triggers the backend to send a password reset link. Shows a success message regardless of whether the email exists (to prevent user enumeration). |
| `ResetPassword.tsx` | Reads the `?token=` query parameter from the reset email link, accepts a new password, and submits to the backend. Redirects to login on success. |

---

#### `dashboard/shared/`

Pages accessible to any authenticated user regardless of role.

| File | Purpose |
|---|---|
| `BrowseProjects.tsx` | Full browsing interface for research postings. Left sidebar with multi-select filters (status, type, location, tags). Right content area with a search bar and a 2-column grid of `ProjectCard` components. Tags are derived dynamically from actual posting data. Also used as the public `/public-browse` route (no auth required). |
| `Profile.tsx` | The authenticated user's own profile page. Shows avatar initials, headline, bio, skills, experience entries, location, email, and social links. Has an "Edit Profile" button linking to `EditProfile`. |
| `EditProfile.tsx` | Profile editing form. Fields: headline, bio, university, department, location, skill tags (Enter-to-add), dynamic experience entries (add/remove), and social link inputs. Submits to `PUT /users/me/profile`. |
| `PublicProfile.tsx` | Read-only profile view for any user by their ID. Same layout as `Profile.tsx` but fetches from `GET /users/:id/profile` and has no edit button. Linked from applicant detail views. |
| `SettingsPage.tsx` | Account settings page. Contains a change-password form (current password, new password, confirm). Also has an Appearance section noting the theme toggle location. |
| `ViewPosting.tsx` | Full detail view for a single research posting. Left column: title, status badge, description, requirements, tags. Right sidebar: researcher card, key details (deadline, location, duration, stipend), and an Apply Now button for students (disabled if already applied or posting is closed). |

---

#### `dashboard/student/`

Pages accessible only to users with the `STUDENT` role.

| File | Purpose |
|---|---|
| `StudentDashboard.tsx` | Student home screen. Three metric cards (Total Applications, Accepted, Pending). A "Recent Applications" table showing the 5 most recent with posting title, date, and status badge. |
| `MyApplications.tsx` | Full table of all the student's applications. Columns: project title, applied date, status. Clicking a row navigates to `ViewApplication`. |
| `ApplicationPage.tsx` | Multi-field application form for a specific posting (ID from URL param). Three textarea fields: cover letter, motivation, relevant experience. Submits to `POST /applications`. |
| `ViewApplication.tsx` | Detailed view of a single application the student submitted. Displays all three essay fields and the current status badge. Has a "Withdraw Application" button that patches the status to WITHDRAWN. |

---

#### `dashboard/researcher/`

Pages accessible only to users with the `RESEARCHER` role.

| File | Purpose |
|---|---|
| `ResearcherDashboard.tsx` | Researcher home screen. Four metric cards (Active Postings, Total Applications, Closed Postings, Pending Reviews). A "Recent Applicants" table with applicant name, project, date, and status badge. |
| `MyPostings.tsx` | Table of the researcher's own postings sorted by deadline. Columns: title, open/closed status, deadline, action icons (view applicants, edit). Has a "Create New Posting" button. |
| `CreatePosting.tsx` | Form to publish a new research posting. Sections: Basic Info (title, type, description, open positions), Project Details (deadline, location, duration, compensation), Tech Stack & Requirements (tag input, requirements textarea). |
| `EditPosting.tsx` | Same form as `CreatePosting` but pre-populated from the existing posting. Adds a two-step delete confirmation (click "Delete Posting" → button changes to "Confirm Delete" + "Cancel") to prevent accidental deletion. |
| `ViewApplicants.tsx` | Table of all applicants for a specific posting. Columns: name, email, submitted date, status, action buttons. Inline Accept/Reject buttons for PENDING applications. Clicking a row navigates to `ResearcherViewApplication`. |
| `ResearcherViewApplication.tsx` | Full detail view of a single application from the researcher's perspective. Shows applicant name (linked to their public profile), email, posting link, all three essay fields. Context-aware Accept/Reject/Reset-to-Pending action buttons. |

---

#### `pages/public/`

Public-facing informational pages. All rendered under `PublicLayout` (with navbar and footer). No authentication required.

| File | Purpose |
|---|---|
| `Landing.tsx` | The homepage (`/`). Three sections: hero (headline, CTA buttons), feature grid (6 cards explaining platform capabilities), how-it-works (3-step visual), and a CTA banner linking to register. |
| `About.tsx` | Platform background. Sections: mission statement, team members (Dr. Joshua Pearce as PI, Mouiz as lead developer), three value pillars (Research-First, Student-Centred, Privacy by Design), CTA. |
| `FAQ.tsx` | Accordion-style FAQ with 10 questions covering SSO login, roles, how to apply, data privacy, posting management, and more. Each question expands on click via local state. |
| `Documentation.tsx` | Step-by-step user guide split into two tracks: Students (sign in → complete profile → browse → apply) and Researchers (sign in → create posting → review applicants → manage). Includes a profile tips card. |
| `Support.tsx` | Three support channels: platform bug email, Western Technology Services link for SSO/login issues, and a link to the FAQ. Clarifies that WTS handles credential problems, not VRMM. |
| `PrivacyPolicy.tsx` | Formal FIPPA-compliant privacy policy. Sections: overview (TRAC/PIA approval), information collected (SSO identity, profile data, applications), how it's used, data storage and security (on-premise, HTTPS), retention, FIPPA rights. |
| `TermsOfService.tsx` | Terms of use for the platform. Sections: eligibility (Western accounts only), acceptable use prohibitions, researcher responsibilities, student responsibilities, platform availability, suspension policy, liability limitation. |

---

### `src/routes/`

| File | Purpose |
|---|---|
| `ProtectedRoutes.tsx` | Route guard component used in `App.tsx`. Reads the JWT from `AuthContext`. If not logged in, redirects to `/login`. If a `roles` prop is provided (e.g., `["student"]`) and the user's role doesn't match, redirects them to their correct dashboard instead of showing a 403. Wraps both the generic authenticated route group and the role-specific student/researcher groups. |
