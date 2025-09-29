# Videos Dashboard

A lightweight frontend scaffold for reviewing and tagging videos. The application is structured to support three primary
workspaces:

- **Review & Tag** – Play MP4 videos, toggle configurable tag categories, and jot down contextual notes.
- **Analysis** – Reserved for future reporting on tag usage trends.
- **Video Library** – Placeholder for upcoming filtering and discovery tools.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser. By default the dev server runs on [http://localhost:5173](http://localhost:5173).

## Configuration

- Tag categories live in `src/data/tagCategories.js`.
- Seed video metadata is located in `src/data/videos.js`. Replace the `src` values with actual `.mp4` assets reachable by the browser. Video entries that follow the `m002-20250917-1758079317_video.mp4` naming convention will automatically surface a read-only "Capture Time" tag based on the hour and minute extracted from the filename.

## Tech stack

- [Vite](https://vitejs.dev/) for local development.
- [React 18](https://react.dev/) for the component architecture.

This project intentionally ships without persistent storage or routing. Layer in your preferred data layer and API hooks as
those features come online.
