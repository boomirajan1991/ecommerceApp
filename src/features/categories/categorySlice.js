import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../Common/api";

export const fetchAsyncCategory = createAsyncThunk(
  "categories/fetchAsyncCategory",
  async (object) => {
    const response = await API.post("category/getAllCategory", object);
    return response.data;
  }
);

export const switchAsyncCategoryStatus = createAsyncThunk(
  "categories/switchAsyncCategoryStatus",
  async (object) => {
    const response = await API.post("category/updateCategoryStatus", object);
    return response.data;
  }
);

export const addAsyncCategory = createAsyncThunk(
  "categories/addAsyncCategory",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("category/addCategory", formData);
      response.data.success
        ? toast.success("Add Category Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 901 &&
          toast.error("Add Category Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAsyncCategory = createAsyncThunk(
  "categories/updateAsyncCategory",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("category/updateCategory", formData);
      response.data.success
        ? toast.success("Update Category Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 911 &&
          toast.error("Update Category Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAsyncParentCategory = createAsyncThunk(
  "categories/fetchAsyncParentCategory",
  async (object) => {
    const response = await API.post("category/getParentCategory", object);
    return response.data;
  }
);

export const filterAsyncCategoryStatus = createAsyncThunk(
  "categories/filterAsyncCategoryStatus",
  async (object) => {
    return object;
  }
);

const initialState = {
  categories: {},
  switchCategoryStatus: {},
  addCategory: {},
  updateCategory: {},
  parentCategory: {},
  getCategoryStatus: true,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncCategory.fulfilled]: (state, { payload }) => {
      return { ...state, categories: payload };
    },
    [switchAsyncCategoryStatus.fulfilled]: (state, { payload }) => {
      return { ...state, switchCategoryStatus: payload };
    },
    [addAsyncCategory.fulfilled]: (state, { payload }) => {
      return { ...state, addCategory: payload };
    },
    [updateAsyncCategory.fulfilled]: (state, { payload }) => {
      return { ...state, updateCategory: payload };
    },
    [fetchAsyncParentCategory.fulfilled]: (state, { payload }) => {
      return { ...state, parentCategory: payload };
    },
    [filterAsyncCategoryStatus.fulfilled]: (state, { payload }) => {
      return { ...state, getCategoryStatus: payload };
    },
  },
});

export const getAllCategories = (state) => state.categories.categories;
export const getswitchCategoryStatus = (state) =>
  state.categories.switchCategoryStatus;
export const addCategory = (state) => state.categories.addCategory;
export const updateCategory = (state) => state.categories.updateCategory;
export const getCategoryStatus = (state) => state.categories.getCategoryStatus;
export const fetchParentCategory = (state) => state.categories.parentCategory;
export default categorySlice.reducer;
