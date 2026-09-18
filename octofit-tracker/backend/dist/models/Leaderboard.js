import mongoose from 'mongoose';
const leaderboardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, default: 'all-time' },
}, { timestamps: true });
export const LeaderboardModel = mongoose.model('Leaderboard', leaderboardSchema);
