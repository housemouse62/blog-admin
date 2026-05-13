# blog-admin

Author-facing admin panel for the Thought Windows blog. Built with React 19 and Vite.

Provides full post CRUD, comment management, and user profile editing. All routes are protected — only users with `usertype: "author"` can access the app.

---

## Tech Stack

- **Framework**: React 19
- **Build tool**: Vite
- **Routing**: React Router 7
- **Auth**: JWT via `jwt-decode` + `localStorage`

---

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5175`.

> **Note**: The app expects the `blog-window` API to be running at `http://localhost:3000`. Your account must have `usertype = "author"` in the database to log in.

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 5175 |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## Routes

All routes except `/` are wrapped in `<ProtectedRoute>` and require an authenticated author session.

| Path | Component | Description |
|---|---|---|
| `/` | Login | Author login |
| `/posts` | Posts | All posts — published and drafts |
| `/posts/new` | CreatePost | Create a new post |
| `/posts/:postID` | Post | View a post with comments and replies |
| `/posts/:postID/edit` | EditPost | Edit an existing post |
| `/profile` | Profile | Update display name and screen name |

---

## Features

- View all posts including unpublished drafts
- Create new posts with a published/draft toggle
- Edit post title, body, and published status
- Delete posts
- View, edit, and delete comments and replies on any post
- Update your author profile

---

## Authentication

On login, a JWT is stored in `localStorage` under the key `"token"` and decoded client-side with `jwt-decode`. Auth state is managed globally via `AuthContext` (`src/AuthContext.jsx`).

`<ProtectedRoute>` (`src/ProtectedRoute.jsx`) checks for a valid token on every protected route and redirects unauthenticated or unauthorized users back to `/`. Logging out clears the token from `localStorage`.
