import mongoose, { type InferSchemaType } from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema>;
export const TeamModel = mongoose.model('Team', teamSchema);
