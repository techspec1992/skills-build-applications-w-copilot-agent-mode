# OctoFit Tracker Backend

The logic and data tier uses Node.js, Express, TypeScript, MongoDB, and Mongoose.

## Run locally

MongoDB must be available at `mongodb://localhost:27017/octofit_db`.

```bash
npm install
npm run seed
npm run dev
```

The API listens on port `8000`.

## Scripts

- `npm run build` compiles TypeScript to `dist/`.
- `npm run dev` starts the API with watch mode.
- `npm run start` runs the compiled API.
- `npm run seed` replaces the sample data in every collection.

## API routes

- `GET /api/users/`
- `GET /api/teams/`
- `GET /api/activities/`
- `GET /api/leaderboard/`
- `GET /api/workouts/`

When `CODESPACE_NAME` is set, the API base URL is `https://$CODESPACE_NAME-8000.app.github.dev`. Without it, use `http://localhost:8000`.
