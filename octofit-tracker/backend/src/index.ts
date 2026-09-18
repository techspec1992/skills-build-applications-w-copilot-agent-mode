import express from 'express';
import { connectDatabase } from './config/database.js';
import { ActivityModel } from './models/Activity.js';
import { LeaderboardModel } from './models/Leaderboard.js';
import { TeamModel } from './models/Team.js';
import { UserModel } from './models/User.js';
import { WorkoutModel } from './models/Workout.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    baseUrl: apiBaseUrl,
    routes: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await UserModel.find().sort({ lastName: 1, firstName: 1 }));
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await TeamModel.find().populate('members', 'username firstName lastName'));
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await ActivityModel.find().populate('user team').sort({ completedAt: -1 }));
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await LeaderboardModel.find().populate('user team').sort({ rank: 1 }));
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await WorkoutModel.find().populate('suggestedFor'));
});

async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exitCode = 1;
});