import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settings/settingSlice";
import categoryReducer from "./categories/categorySlice";

const reducers = {
  settings: settingReducer,
  categories: categoryReducer,
};

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production'
});
