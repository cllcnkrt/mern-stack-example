import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GoalState {}

const initialState = {} as GoalState;

export const GoalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
});

export const {} = GoalsSlice.actions;

export const selectGoals = (state: any) => state.filter;
export default GoalsSlice.reducer;
