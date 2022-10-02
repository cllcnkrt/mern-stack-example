const asyncHandler = require('express-async-handler');

// desc Get Goals
//route GET /api/goals
//access Private

const getGoals = (req, res) => {
  res.status(200).json({ message: 'get goals' });
};

// desc Set Goal
//route POST /api/goals
//access Private

const setGoals = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('!!! Please add a text field');
  }

  res.status(200).json({ message: 'set goals' });
};

// desc put Goal
//route PUT /api/goals:id
//access Private

const updateGoal = (req, res) => {
  res.status(200).json({ message: `update goal ${req.params.id}` });
};

// desc Delete Goal
//route DELETE /api/goals:id
//access Private

const deleteGoal = (req, res) => {
  res.status(200).json({ message: `delete goals ${req.params.id}` });
};

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
