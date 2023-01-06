// Dependencies
import { configureStore } from "@reduxjs/toolkit";

// Slices
import stepReducer from "../slices/step.slice";

export const StepStore = configureStore({
  reducer: {
    step: stepReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type StepState = ReturnType<typeof StepStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof StepStore.dispatch;
