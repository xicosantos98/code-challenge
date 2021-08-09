const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../../models/UserModel");

// Get user details by id
const getUserDetailsAction = async (req, res) => {
	try {
		const user = await User.findById(req.user.id, { password: 0 });
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			error: true,
			message: "Something went wrong",
		});
	}
};

// Add new user
const addUserAction = async (req, res) => {
	const { name, username, password } = req.body;
	try {
		let user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({
				error: true,
				message: `The user with the name ${name} already exists`,
			});
		}

		user = new User({
			name,
			username,
			password,
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.jwtSecret,
			{ expiresIn: "5 days" },
			(err, token) => {
				if (err) throw err;

				res.json({
					token,
					name: user.name,
					username: user.username,
					_id: user._id,
				});
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			error: true,
			message: "Something went wrong",
		});
	}
};

// Authenticate user & get token
const authenticateUserAction = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res
				.status(400)
				.json({ error: true, message: "Invalid Credentials'" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res
				.status(400)
				.json({ error: true, message: "Invalid Credentials'" });
		}

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.jwtSecret,
			{ expiresIn: "5 days" },
			(err, token) => {
				if (err) throw err;

				res.json({
					token,
					name: user.name,
					username: user.username,
					_id: user._id,
				});
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			error: true,
			message: "Something went wrong",
		});
	}
};

module.exports = {
	addUserAction,
	getUserDetailsAction,
	authenticateUserAction,
};
