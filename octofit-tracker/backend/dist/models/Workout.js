import mongoose from 'mongoose';
const workoutSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    focus: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, trim: true }],
    suggestedFor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
export const WorkoutModel = mongoose.model('Workout', workoutSchema);
