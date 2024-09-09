import mongoose from 'mongoose';

const TasksSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Todo', 'InProgress', 'Done'],
      default: ['Todo'],
    },
  },
  {
    timestamps: true,
  }
);

export const Tasks = mongoose.model('Tasks', TasksSchema);
