import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { goalService } from "../../../services";
import { IGoals } from "./Goals";

//Register
export const getGoals = createAsyncThunk<
  IGoals.State,
  IGoals.State,
  {
    rejectValue: string;
  }
>("user", async (user: IGoals.State, thunkAPI) => {
  try {
    return await goalService.getGoals(user);
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

export const GoalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
});

const GoalSlice = createSlice({
  name: "goals",

  initialState,
  reducers: {
    reset: (state) => {
      state.goals = [];
      state.loading = "idle";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.loading = "pending";
        state.goals = [];
        state.errorMessage = "";
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.goals = action.payload.goals;
        state.errorMessage = "";
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.loading = "failed";
        state.goals = [];
        state.errorMessage = action.payload as string;
      });
  },
});

export const { reset } = GoalSlice.actions;
export const { actions, reducer } = GoalSlice;

export const selectGoals = (state: IGoals.State) => state;
export default GoalsSlice.reducer;
