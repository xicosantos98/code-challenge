const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    projectId: {
      type: String,
    },
  },
  { timestamps: true },
);

TaskSchema.index({ projectId: 1 }, { background: true, name: 'projectId_1' });

module.exports = mongoose.model('task', TaskSchema);
