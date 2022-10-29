const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');
// desc Get Goals
//route GET /api/goals
//access Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// desc Set Goal
//route POST /api/goals
//access Private

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('!!! Please add a text field');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// desc put Goal
//route PUT /api/goals:id
//access Private

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }


  //Check user
  if (!req.user) {
    res.status(401);
    throw new Error('Not found');
  }

  //Make sure user owns goal
  if (req.user.id.toString() !== goal.user.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    req.body,
    true
  );
  res.status(200).json(updatedGoal);
});

// desc Delete Goal
//route DELETE /api/goals:id
//access Private

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }


  //Check user
  if (!req.user) {
    res.status(401);
    throw new Error('Not found');
  }

  //Make sure user owns goal
  if (req.user.id.toString() !== goal.user.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
