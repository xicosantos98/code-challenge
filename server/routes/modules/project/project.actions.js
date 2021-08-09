const Project = require('../../../models/ProjectModel');

// Get projects by user
const getProjectsByUserAction = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.json({
      error: false,
      projects,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Add new project
const addProjectAction = async (req, res) => {
  const { name, key, description } = req.body;
  const { id: userId } = req.user;

  try {
    let project = await Project.findOne({ name });

    if (project) {
      return res.status(400).json({
        error: true,
        message: `The project with the name ${name} already exists`,
      });
    }

    project = new Project({
      name,
      key,
      description,
      userId,
    });

    await project.save();

    res.json({ error: false, project });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Update project
const updateProjectAction = async (req, res) => {
  const { _id } = req.params;
  const { name, description } = req.body;
  const { id: userId } = req.user;

  try {
    const project = await Project.findById({ _id });

    if (!project) {
      return res
        .status(400)
        .json({ error: true, message: `The project ${_id} does not exist` });
    }

    if (project.userId !== userId) {
      return res.status(403).json({
        error: true,
        message: `You do not have permissions to update the project ${_id}`,
      });
    }

    project.name = name || project.name;
    project.description = description || project.description;

    await project.save();

    res.json({ error: false, project });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};

// Update project
const deleteProjectAction = async (req, res) => {
  const { _id } = req.params;
  const { id: userId } = req.user;

  try {
    const project = await Project.findById({ _id });

    if (!project) {
      return res
        .status(400)
        .json({ error: true, message: `The project ${_id} does not exist` });
    }

    if (project.userId !== userId) {
      return res.status(403).json({
        error: true,
        message: `You do not have permissions to delete the project ${_id}`,
      });
    }

    await project.remove();

    res.json({ error: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  getProjectsByUserAction,
  addProjectAction,
  updateProjectAction,
  deleteProjectAction,
};
