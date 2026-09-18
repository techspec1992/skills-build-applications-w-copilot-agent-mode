import mongoose from 'mongoose';
import { connectionString } from '../config/database.js';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            ActivityModel.deleteMany({}),
            LeaderboardModel.deleteMany({}),
            TeamModel.deleteMany({}),
            UserModel.deleteMany({}),
            WorkoutModel.deleteMany({}),
        ]);
        const [alex, jordan, sam] = await UserModel.create([
            { username: 'alex.runner', email: 'alex@example.com', firstName: 'Alex', lastName: 'Rivera', avatar: 'AR' },
            { username: 'jordan.moves', email: 'jordan@example.com', firstName: 'Jordan', lastName: 'Lee', avatar: 'JL' },
            { username: 'sam.strong', email: 'sam@example.com', firstName: 'Sam', lastName: 'Patel', avatar: 'SP' },
        ]);
        const [trailblazers, powerSquad] = await TeamModel.create([
            {
                name: 'Trailblazers',
                description: 'Miles, movement, and friendly competition.',
                color: '#1677ff',
                members: [alex._id, jordan._id],
            },
            {
                name: 'Power Squad',
                description: 'Strength-focused teammates who lift each other up.',
                color: '#e8590c',
                members: [sam._id],
            },
        ]);
        await ActivityModel.create([
            { user: alex._id, team: trailblazers._id, type: 'running', durationMinutes: 32, distanceMiles: 3.1, points: 42, completedAt: new Date('2026-09-15') },
            { user: jordan._id, team: trailblazers._id, type: 'cycling', durationMinutes: 45, distanceMiles: 8.4, points: 48, completedAt: new Date('2026-09-16') },
            { user: sam._id, team: powerSquad._id, type: 'strength', durationMinutes: 38, points: 40, completedAt: new Date('2026-09-17') },
        ]);
        await LeaderboardModel.create([
            { user: alex._id, team: trailblazers._id, points: 420, rank: 1 },
            { user: sam._id, team: powerSquad._id, points: 380, rank: 2 },
            { user: jordan._id, team: trailblazers._id, points: 315, rank: 3 },
        ]);
        await WorkoutModel.create([
            {
                title: 'After-School Cardio Circuit',
                description: 'A short circuit to build endurance without equipment.',
                level: 'beginner',
                focus: 'Cardio',
                durationMinutes: 20,
                exercises: ['High knees', 'Bodyweight squats', 'Mountain climbers'],
                suggestedFor: alex._id,
            },
            {
                title: 'Full-Body Strength Builder',
                description: 'A balanced strength session for a focused training day.',
                level: 'intermediate',
                focus: 'Strength',
                durationMinutes: 35,
                exercises: ['Push-ups', 'Reverse lunges', 'Plank shoulder taps'],
                suggestedFor: sam._id,
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
