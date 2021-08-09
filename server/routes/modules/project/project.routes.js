const express = require("express");
require("dotenv").config();

const router = express.Router();
const { check, oneOf } = require("express-validator");
const requestValidator = require("../../../middleware/requestValidator");
const authValidator = require("../../../middleware/authValidator");

const {
	getProjectsByUserAction,
	addProjectAction,
	updateProjectAction,
	deleteProjectAction,
} = require("./project.actions");

// Get projects by user
router.get("/", authValidator, getProjectsByUserAction);

// Add new project
router.post(
	"/",
	authValidator,
	check("name", "Name is required").notEmpty(),
	check("key", "Key is required").notEmpty(),
	check("description", "Description is required").notEmpty(),
	requestValidator,
	addProjectAction
);

// Update project
router.put(
	"/:_id",
	authValidator,
	oneOf([
		check("name", "Provide a name or description").notEmpty(),
		check("description", "Provide a name or description").notEmpty(),
	]),
	requestValidator,
	updateProjectAction
);

// Delete project
router.delete("/:_id", authValidator, requestValidator, deleteProjectAction);

module.exports = router;
