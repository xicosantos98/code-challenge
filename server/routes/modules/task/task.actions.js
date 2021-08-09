const Project = require('../../../models/ProjectModel');
const Task = require('../../../models/TaskModel');

// Get tasks by project ID
const getTasksByProjectAction = async (req, res) => {
  try {
    const { _id } = req.params;

    const project = await Project.findById({ _id });

    if (!project) {
      return res
        .status(400)
        .json({ error: true, message: `The project ${_id} does not exist` });
    }

    const tasks = await Task.find({ projectId: _id });

    res.json({
      error: false,
      projectId: _id,
      tasks,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Add task to a project
const addTaskAction = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { id: userId } = req.user;

    const project = await Project.findById({ _id: projectId });

    if (!project) {
      return res.status(400).json({
        error: true,
        message: `The project ${projectId} does not exist`,
      });
    }

    if (project.userId !== userId) {
      return res.status(403).json({
        error: true,
        message: `You do not have permissions to update the project ${projectId}`,
      });
    }

    const { name } = req.body;

    const task = new Task({
      name,
      projectId,
    });

    await task.save();

    res.json({ error: false, task });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Update task
const updateTaskAction = async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;

  try {
    const task = await Task.findById({ _id });

    if (!task) {
      return res
        .status(400)
        .json({ error: true, message: `The task ${_id} does not exist` });
    }

    const { id: userId } = req.user;
    const project = await Project.findById({ _id: task.projectId });

    if (project.userId !== userId) {
      return res.status(403).json({
        error: true,
        message: `You do not have permissions to update the project ${_id}`,
      });
    }

    task.name = name;

    await task.save();

    res.json({ error: false, task });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Delete task from project
const deleteTaskAction = async (req, res) => {
  const { _id } = req.params;

  try {
    const task = await Task.findById({ _id });

    if (!task) {
      return res
        .status(400)
        .json({ error: true, message: `The task ${_id} does not exist` });
    }

    const { id: userId } = req.user;
    const project = await Project.findById({ _id: task.projectId });

    if (project.userId !== userId) {
      return res.status(403).json({
        error: true,
        message: `You do not have permissions to update the project ${_id}`,
      });
    }

    await task.remove();

    res.json({ error: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};


// Delete all tasks from project
const deleteAllTasksAction = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById({ _id: projectId });
    if (!project) {
      return res
        .status(400)
        .json({ error: true, message: `The project ${projectId} does not exist` });
    }

    const { id: userId } = req.user;

    if (project.userId !== userId) {
      return res.status(403).json({
        error: true,
        message: `You do not have permissions to delete tasks from the project ${projectId}`,
      });
    }

    await Task.deleteMany({ projectId });

    res.json({ error: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Update task status
const updateTaskStatusAction = async (req, res) => {
  const { _id } = req.params;

  try {
    const task = await Task.findById({ _id });

    if (!task) {
      return res
        .status(400)
        .json({ error: true, message: `The task ${_id} does not exist` });
    }

    const { id: userId } = req.user;
    const project = await Project.findById({ _id: task.projectId });

    if (project.userId !== userId) {
      return res.status(403).json({
        error: true,
        message: `You do not have permissions to update the project ${_id}`,
      });
    }

    const { endDate = null } = task;

    task.endDate = endDate ? null : new Date();

    await task.save();

    res.json({ error: false, task });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  getTasksByProjectAction,
  addTaskAction,
  updateTaskAction,
  deleteTaskAction,
  deleteAllTasksAction,
  updateTaskStatusAction,
};
