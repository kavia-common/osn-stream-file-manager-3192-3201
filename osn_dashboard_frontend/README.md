# OSN Dashboard Frontend

React dashboard to upload and manage .ts files and metadata for OSN set-top box streaming.

Theme: Ocean Professional (primary #2563EB, secondary #F59E0B, background #f9fafb, surface #ffffff, text #111827)

## Features

- Layout: TopNav with theme toggle, Sidebar, main Container
- UploadPanel: drag-and-drop and form (title, type, language, bitrate, duration) validating .ts
- Files: list, filters, details modal, update/delete
- API client and endpoints for GET/POST/PATCH/DELETE /files
- Mock server fallback if no API base or feature flag `mockApi`
- Accessibility: aria labels, keyboard nav, live regions
- Basic smoke test

## Quick start

- Install: `npm install`
- Run dev: `npm start`
- Run tests: `npm test`
- Build: `npm run build`

## Environment variables

Place in `.env` (do not commit secrets). Example `.env.example`:

```
REACT_APP_API_BASE=http://localhost:3001
REACT_APP_BACKEND_URL=
REACT_APP_WS_URL=
REACT_APP_FRONTEND_URL=http://localhost:3000
REACT_APP_LOG_LEVEL=info
REACT_APP_FEATURE_FLAGS=mockApi
```

Precedence for API base: `REACT_APP_API_BASE` then `REACT_APP_BACKEND_URL`. If neither is set, mock API will be enabled automatically.

Feature flags:
- `mockApi` — force in-memory mock server even if backend exists

## Using with real backend

- Ensure backend implements:
  - GET /files
  - POST /files (multipart: file + fields: title, type, language, bitrate, duration)
  - GET /files/:id
  - PATCH /files/:id
  - DELETE /files/:id
- Set `REACT_APP_API_BASE` to backend base URL
- Start frontend: `npm start`

## Using mock server

- Omit `REACT_APP_API_BASE` (or set `REACT_APP_FEATURE_FLAGS=mockApi`)
- The app installs a fetch interceptor to serve in-memory data

## Optional local proxy

For local dev without CORS:
- If `REACT_APP_API_BASE` is not set and your backend runs on `http://localhost:3001`, the included `src/setupProxy.js` proxies `/files` there automatically when starting dev server.

## Project structure

- src/api: API client and endpoints
- src/components: UI components (Layout, Upload, Files, Common)
- src/hooks: hooks (useEnv, useFiles, useUpload)
- src/mocks: mockServer
- src/utils: helpers

## Accessibility

- Buttons/controls include aria labels
- Live region provided for status updates
- Keyboard operable: modal focus trapping and close control

## Notes

- This project uses create-react-app and vanilla CSS, no heavy UI frameworks.
- Ensure `.env` variables are prefixed with `REACT_APP_` for CRA.
