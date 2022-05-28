import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../Common/api";

export const fetchAsyncSettings = createAsyncThunk(
  "settings/fetchAsyncSettings",
  async (object) => {
    const response = await API.post("setting/getSettings", object);
    return response.data;
  }
);

export const updateAsyncSettings = createAsyncThunk(
  "settings/updateAsyncSettings",
  async ({ values, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("setting/updateSettings", values);
      response.data.success
        ? toast.success("Updated Setting Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 908 &&
          toast.error("Updated Setting Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAsyncProfile = createAsyncThunk(
  "settings/fetchAsyncProfile",
  async (object) => {
    const response = await API.post("users/getuser", object);
    return await response.data;
  }
);

export const updateAsyncProfile = createAsyncThunk(
  "settings/updateAsyncProfile",
  async ({ values, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("users/updateuser", values);
      response.data.success
        ? toast.success("Updated Profile Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 910 &&
          toast.error("Updated Profile Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAsyncBrand = createAsyncThunk(
  "settings/fetchAsyncBrand",
  async (object) => {
    const response = await API.post("brand/getAllBrand", object);
    return response.data;
  }
);

export const switchAsyncBrandStatus = createAsyncThunk(
  "settings/switchAsyncBrandStatus",
  async (object) => {
    const response = await API.post("brand/updateBrandStatus", object);
    return response.data;
  }
);

export const addAsyncBrand = createAsyncThunk(
  "settings/addAsyncBrand",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("brand/addBrand", formData);
      response.data.success
        ? toast.success("Add Brand Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 901 &&
          toast.error("Add Brand Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAsyncBrand = createAsyncThunk(
  "settings/updateAsyncBrand",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("brand/updateBrand", formData);
      response.data.success
        ? toast.success("Update Brand Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 909 &&
          toast.error("Update Brand Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const filterAsyncBrandStatus = createAsyncThunk(
  "settings/filterAsyncBrandStatus",
  async (object) => {
    return object;
  }
);

export const fetchAsyncCoupon = createAsyncThunk(
  "settings/fetchAsyncCoupon",
  async (object) => {
    const response = await API.post("coupon/getAllCoupon", object);
    return response.data;
  }
);

export const addAsyncCoupon = createAsyncThunk(
  "settings/addAsyncCoupon",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("coupon/addCoupon", formData);
      response.data.success
        ? toast.success("Add Coupon Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 912 &&
          toast.error("Add Coupon Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAsyncCoupon = createAsyncThunk(
  "settings/updateAsyncCoupon",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("coupon/updateCoupon", formData);
      response.data.success
        ? toast.success("Update Coupon Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 913 &&
          toast.error("Update Coupon Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAsyncGetCouponCode = createAsyncThunk(
  "settings/fetchAsyncGetCouponCode",
  async (object) => {
    const response = await API.post("coupon/getCouponCode", object);
    return response.data;
  }
);

export const switchAsyncCouponStatus = createAsyncThunk(
  "settings/switchAsyncCouponStatus",
  async (object) => {
    const response = await API.post("coupon/updateCouponStatus", object);
    return response.data;
  }
);

export const filterAsyncCouponStatus = createAsyncThunk(
  "settings/filterAsyncCouponStatus",
  async (object) => {
    return object;
  }
);

export const fetchAsyncProduct = createAsyncThunk(
  "settings/fetchAsyncProduct",
  async (object) => {
    const response = await API.post("product/getAllProduct", object);
    return response.data;
  }
);

export const switchAsyncProductStatus = createAsyncThunk(
  "settings/switchAsyncProductStatus",
  async (object) => {
    const response = await API.post("product/updateProductStatus", object);
    return response.data;
  }
);

export const addAsyncProduct = createAsyncThunk(
  "settings/addAsyncProduct",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("product/addProduct", formData);
      response.data.success
        ? toast.success("Add Product Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 916 &&
          toast.error("Add Product Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAsyncProduct = createAsyncThunk(
  "settings/updateAsyncProduct",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("product/updateProduct", formData);
      response.data.success
        ? toast.success("Update Product Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 917 &&
          toast.error("Update Product Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadAsyncMutipleImage = createAsyncThunk(
  "settings/uploadAsyncMutipleImage",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("product/uploadMutipleImage", formData);
      response.data.success
        ? toast.success("Add Images Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 916 &&
          toast.error("Add Images Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAsyncMutipleImage = createAsyncThunk(
  "settings/deleteAsyncMutipleImage",
  async ({ formDataImage, navigate, toast }, { rejectWithValue }) => {
    console.log('formDataImage ------------- ',formDataImage);
    try {
      const response = await API.post("product/deleteImageById", formDataImage);
      response.data.success
        ? toast.success("Delete Image Successfully", { theme: "colored" })
        : response.data.message === 999
        ? toast.error("Token Expired", { theme: "colored" })(navigate("/login"))
        : response.data.message === 922 &&
          toast.error("Delete Image Failed", { theme: "colored" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const filterAsyncProductStatus = createAsyncThunk(
  "settings/filterAsyncProductStatus",
  async (object) => {
    return object;
  }
);

const initialState = {
  settings: {},
  updateSettings: {},
  profile: {},
  updateProfile: {},
  brands: {},
  switchBrandStatus: {},
  addBrand: {},
  updateBrand: {},
  getBrandStatus: true,
  coupon: {},
  switchCouponStatus: {},
  addCoupon: {},
  updateCoupon: {},
  getCouponCode: {},
  getCouponStatus: true,
  products: {},
  switchProductStatus: {},
  addProduct: {},
  updateProduct: {},
  getProductStatus: true,
  uploadMutipleImage: [],
  deleteMutipleImage: [],
};

export const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLogout: (state, action) => {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers: {
    [fetchAsyncSettings.fulfilled]: (state, { payload }) => {
      return { ...state, settings: payload };
    },
    [updateAsyncSettings.fulfilled]: (state, { payload }) => {
      return { ...state, updateSettings: payload };
    },
    [fetchAsyncProfile.fulfilled]: (state, { payload }) => {
      return { ...state, profile: payload };
    },
    [updateAsyncProfile.fulfilled]: (state, { payload }) => {
      return { ...state, updateProfile: payload };
    },
    [fetchAsyncBrand.fulfilled]: (state, { payload }) => {
      return { ...state, brands: payload };
    },
    [switchAsyncBrandStatus.fulfilled]: (state, { payload }) => {
      return { ...state, switchBrandStatus: payload };
    },
    [addAsyncBrand.fulfilled]: (state, { payload }) => {
      return { ...state, addBrand: payload };
    },
    [updateAsyncBrand.fulfilled]: (state, { payload }) => {
      return { ...state, updateBrand: payload };
    },
    [filterAsyncBrandStatus.fulfilled]: (state, { payload }) => {
      return { ...state, getBrandStatus: payload };
    },
    [fetchAsyncCoupon.fulfilled]: (state, { payload }) => {
      return { ...state, coupon: payload };
    },
    [switchAsyncCouponStatus.fulfilled]: (state, { payload }) => {
      return { ...state, switchCouponStatus: payload };
    },
    [addAsyncCoupon.fulfilled]: (state, { payload }) => {
      return { ...state, addCoupon: payload };
    },
    [updateAsyncCoupon.fulfilled]: (state, { payload }) => {
      return { ...state, updateCoupon: payload };
    },
    [fetchAsyncGetCouponCode.fulfilled]: (state, { payload }) => {
      return { ...state, getCouponCode: payload };
    },
    [filterAsyncCouponStatus.fulfilled]: (state, { payload }) => {
      return { ...state, getCouponStatus: payload };
    },
    [fetchAsyncProduct.fulfilled]: (state, { payload }) => {
      return { ...state, products: payload };
    },
    [switchAsyncProductStatus.fulfilled]: (state, { payload }) => {
      return { ...state, switchProductStatus: payload };
    },
    [addAsyncProduct.fulfilled]: (state, { payload }) => {
      return { ...state, addProduct: payload };
    },
    [updateAsyncProduct.fulfilled]: (state, { payload }) => {
      return { ...state, updateProduct: payload };
    },
    [uploadAsyncMutipleImage.fulfilled]: (state, { payload }) => {
      return { ...state, uploadMutipleImage: payload };
    },
    [deleteAsyncMutipleImage.fulfilled]: (state, { payload }) => {
      return { ...state, deleteMutipleImage: payload };
    },
    [filterAsyncProductStatus.fulfilled]: (state, { payload }) => {
      return { ...state, getProductStatus: payload };
    },
  },
});

export const getAllSettings = (state) => state.settings.settings;
export const updateSettings = (state) => state.settings.updateSettings;
export const getProfile = (state) => state.settings.profile;
export const updateProfile = (state) => state.settings.updateProfile;
export const getAllBrands = (state) => state.settings.brands;
export const getswitchBrandStatus = (state) => state.settings.switchBrandStatus;
export const addBrand = (state) => state.settings.addBrand;
export const updateBrand = (state) => state.settings.updateBrand;
export const getBrandStatus = (state) => state.settings.getBrandStatus;
export const getAllCoupon = (state) => state.settings.coupon;
export const getswitchCouponStatus = (state) =>
  state.settings.switchCouponStatus;
export const addCoupon = (state) => state.settings.addCoupon;
export const updateCoupon = (state) => state.settings.updateCoupon;
export const getCouponCode = (state) => state.settings.getCouponCode;
export const getCouponStatus = (state) => state.settings.getCouponStatus;
export const getAllProducts = (state) => state.settings.products;
export const getSwitchProductStatus = (state) =>
  state.settings.switchProductStatus;
export const addProduct = (state) => state.settings.addProduct;
export const updateProduct = (state) => state.settings.updateProduct;
export const uploadMutipleImage = (state) => state.settings.uploadMutipleImage;
export const deleteMutipleImage = (state) => state.settings.deleteMutipleImage;
export const getProductStatus = (state) => state.settings.getProductStatus;
export const { setLogout } = settingSlice.actions;
export default settingSlice.reducer;
