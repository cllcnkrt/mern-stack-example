import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { goalService } from "../../../services";
import { GoalModel } from "../../../services/goal/GoalModel";
import { IGoals } from "./Goals";

// Create new goal
export const createGoal = createAsyncThunk<
  GoalModel.Goal.Response,
  GoalModel.Goal.Request,
  {
    rejectValue: string;
  }
>("goals/create", async (payload: GoalModel.Goal.Request, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.createGoal(payload, token);
  } catch (err: any) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get all goals
export const getGoals = createAsyncThunk<
  GoalModel.Goal.Response[],
  void,
  {
    rejectValue: string;
  }
>("goals/getAll", async (_, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.getGoals(token);
  } catch (err: any) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteGoal = createAsyncThunk<
  GoalModel.Goal.Response,
  string,
  {
    rejectValue: string;
  }
>("goals/delete", async (id: string, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.deleteGoal(id, token);
  } catch (err: any) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState: IGoals.State = {
  goals: [],
  loading: "idle",
  errorMessage: "",
};

const GoalsSlice = createSlice({
  name: "goals",

  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create goal
      .addCase(createGoal.pending, (state) => {
        state.loading = "pending";
        state.errorMessage = "";
      })
      .addCase(createGoal.fulfilled, (state, action: PayloadAction<GoalModel.Goal.Response>) => {
        state.loading = "succeeded";
        console.log("action.payload", action.payload);
        state.goals = [...state.goals, action.payload];
        state.errorMessage = "";
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.loading = "failed";
        state.errorMessage = action.payload as string;
      })
      // Get all goals
      .addCase(getGoals.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getGoals.fulfilled, (state, action: PayloadAction<GoalModel.Goal.Response[]>) => {
        state.loading = "succeeded";
        state.goals = action.payload;
        state.errorMessage = "";
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.loading = "failed";
        state.errorMessage = action.payload as string;
      })
      // Delete goal
      .addCase(deleteGoal.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<GoalModel.Goal.Response>) => {
        state.loading = "succeeded";
        state.goals = state.goals.filter((goal) => goal._id !== action.payload._id);
        state.errorMessage = "";
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.loading = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const { reset } = GoalsSlice.actions;
export const { actions, reducer } = GoalsSlice;

export const selectGoals = (state: IGoals.State) => state;
export default GoalsSlice.reducer;
