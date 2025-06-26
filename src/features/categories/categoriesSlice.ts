import type { CategoryTypeAPI } from "./lib/zodCategory.ts"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RejectedType } from "../admin/adminSlice.ts"
import { handleThunkError } from "../../utils/handleThunkError.ts"
import type { createCategoryProps } from "../../api/caterogy/categoryApi.ts"
import { categoryApi } from "../../api/caterogy/categoryApi.ts"
import type { RejectedPayload } from "../login/authSlice.ts"

export const initialState: CategoriesSliceType = {
  category: null,
  categories: [],
  status: "idle",
  error: "",
  message: "",
}

export const getAllCategoriesThunk = createAsyncThunk<
  CategoryTypeAPI[],
  string,
  RejectedType
>("admin/getAllCategories", async (token, { rejectWithValue }) => {
  try {
    const response = await categoryApi.getCategories(token)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const createCategoryThunk = createAsyncThunk<
  CategoryTypeAPI,
  createCategoryProps,
  RejectedType
>(
  "category/createCategory",
  async ({ token, name, description }, { rejectWithValue }) => {
    try {
      const response = await categoryApi.createCategories({
        token,
        name,
        description,
      })
      return response.data
    } catch (e: any) {
      return rejectWithValue(handleThunkError(e))
    }
  },
)

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllCategoriesThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        getAllCategoriesThunk.fulfilled,
        (state, action: PayloadAction<CategoryTypeAPI[]>) => {
          state.status = "idle"
          state.categories = action.payload
          state.message = ""
        },
      )
      .addCase(
        getAllCategoriesThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(createCategoryThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        createCategoryThunk.fulfilled,
        (state, action: PayloadAction<CategoryTypeAPI>) => {
          state.status = "idle"
          state.category = action.payload
          state.message = ""
        },
      )
      .addCase(
        createCategoryThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
  },
  selectors: {
    selectCategories: state => state.categories,
    selectCategory: state => state.category,
    selectStatusCategories: state => state.status,
    selectErrorCategories: state => state.error,
    selectMessageCategories: state => state.message,
  },
})
export const {
  selectErrorCategories,
  selectMessageCategories,
  selectStatusCategories,
  selectCategory,
  selectCategories,
} = categoriesSlice.selectors
//types
type CategoriesSliceType = {
  category: CategoryTypeAPI | null
  categories: CategoryTypeAPI[]
  status: "idle" | "loading" | "failed"
  error: string | undefined
  message: string
}
