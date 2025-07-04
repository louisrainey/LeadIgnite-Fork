# MVP in Modern React Frontend (Production-Ready)

## 0. README

This document describes how to implement the Model-View-Presenter (MVP) pattern in a production-grade React frontend using your preferred stack. It includes a technology mapping table, directory structure, best practices, and update instructions.

- **Last updated:** 2025-05-05
- **Maintainer:** Ty the Programmer
- **Stack:** React (TypeScript), Tailwind CSS, Next Router, Zustand, Shadcn, Framer Motion, Spline, Cloudinary, Playwright/Jest, Vercel

---

## 1. Overview

Model-View-Presenter (MVP) divides the app into three components:

- **Model:** Data/state and business logic
- **View:** UI rendering and styling
- **Presenter:** UI logic, event handling, and mediation between View and Model

This separation enables testable, decoupled, and maintainable frontend applications. In React, MVP is adapted using components, hooks, and state libraries.

---

## 2. Technology Stack Table

| Role      | Technology/Tool             | Purpose/Notes                |
| --------- | --------------------------- | ---------------------------- |
| View      | React, Shadcn, Tailwind CSS | UI rendering, styling        |
| Model     | Zustand, React Query        | State management, async data |
| Presenter | Custom Hooks, Context       | UI logic, event handling     |
| Routing   | Next Router                 | Navigation                   |
| Animation | Framer Motion               | UI animations                |
| Media     | Cloudinary, Spline          | Asset management, 3D         |
| Testing   | Playwright, Jest            | E2E/unit testing             |
| CI/CD     | Vercel                      | Deployment                   |

---

## 3. Directory Structure Example

```text
frontend/
  components/    # Views (UI)
  state/         # Models (Zustand stores, React Query)
  presenters/    # Presenters (hooks, logic)
  pages/         # Routing (Next.js)
  styles/        # Tailwind configs
  assets/        # Images, 3D, media
  tests/         # Playwright/Jest
  utils/         # Shared utilities
```

---

## 4. Mapping Stack to MVP Roles

- **Model:** Zustand stores, React Query hooks for state/data
- **View:** React components, Shadcn UI, Tailwind CSS for UI
- **Presenter:** Custom hooks/context for UI logic and event handling

---

## 5. Best Practices

- Use strict TypeScript for all files; validate data with Zod if needed
- Keep business logic out of UI components (prefer hooks/services)
- Use React Query for async data and caching
- Memoize expensive logic with useMemo, React.memo
- Modularize state using Zustand slices
- Use Tailwind and Shadcn for consistent, accessible UI
- Write Playwright/Jest tests for all critical flows
- Use dynamic imports and code splitting for performance
- Store global/shared data in state manager or query cache
- Document all architectural decisions and keep this file updated

---

## 6. Update Instructions

- Update this file if the stack, directory structure, or pattern usage changes
- Add a datestamp and your name for traceability
- Review references and keep them current

---

## 7. References

- [React Docs](https://react.dev/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Query](https://tanstack.com/query/v4/)
- [Next.js Routing](https://nextjs.org/docs/routing/introduction)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Cloudinary](https://cloudinary.com/)
- [Spline](https://spline.design/)
- [Playwright](https://playwright.dev/)
- [Jest](https://jestjs.io/)
- [Vercel](https://vercel.com/)

---

<!-- ! All technologies/tools explicitly mapped. todo: Update if stack changes. ! This doc is production-ready as of 2025-05-05. Maintainer: Ty the Programmer -->
