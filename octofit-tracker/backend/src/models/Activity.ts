import mongoose, { type InferSchemaType } from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, enum: ['running', 'walking', 'strength', 'cycling', 'swimming'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceMiles: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type Activity = InferSchemaType<typeof activitySchema>;
export const ActivityModel = mongoose.model('Activity', activitySchema);
