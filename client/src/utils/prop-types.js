import PropTypes from "prop-types";

export const USER = {
	_id: PropTypes.string,
	name: PropTypes.string,
	username: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
};

export const PROJECT = {
	_id: PropTypes.string,
	name: PropTypes.string,
	key: PropTypes.string,
    description: PropTypes.string,
    userId: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	completed_tasks: PropTypes.shape({ total: PropTypes.number }),
	total_tasks: PropTypes.shape({ total: PropTypes.number })
};

export const TASK = {
	_id: PropTypes.string,
	name: PropTypes.string,
	projectId: PropTypes.string,
	endDate: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
}
