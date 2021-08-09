const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    key: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true },
);

ProjectSchema.index({ userId: 1 }, { background: true, name: 'userId_1' });

module.exports = mongoose.model('project', ProjectSchema);
