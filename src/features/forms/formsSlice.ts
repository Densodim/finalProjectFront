import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { FormTypeAPI } from "./lib/zodForms.ts"
import { adminApi } from "../../api/admin/admin-api.tsx"
import { handleThunkError } from "../../utils/handleThunkError.ts"
import type { RejectedType } from "../admin/adminSlice.ts"
import type { RejectedPayload } from "../login/authSlice.ts"
import { CreateFormType, formsAPI } from "../../api/forms/formsAPI.ts"

const initialState: FormsSliceType = {
  form: null,
  forms: [],
  status: "idle",
  error: "",
  message: "",
}
export const getAllFormsThunk = createAsyncThunk<
  FormTypeAPI[],
  string,
  RejectedType
>("admin/getAllForms", async (token, { rejectWithValue }) => {
  try {
    const response = await adminApi.getForms(token)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const createFormThunk = createAsyncThunk<
  FormTypeAPI,
  CreateFormType,
  RejectedType
>(
  "forms/createForm",
  async ({ token, title, description, categoryId }, { rejectWithValue }) => {
    try {
      const response = await formsAPI.createForm({
        token,
        title,
        description,
        categoryId,
      })
      return response.data
    } catch (e: any) {
      return rejectWithValue(handleThunkError(e))
    }
  },
)

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllFormsThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        getAllFormsThunk.fulfilled,
        (state, action: PayloadAction<FormTypeAPI[]>) => {
          state.status = "idle"
          state.forms = action.payload
          state.message = ""
        },
      )
      .addCase(
        getAllFormsThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(createFormThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        createFormThunk.fulfilled,
        (state, action: PayloadAction<FormTypeAPI>) => {
          state.status = "idle"
          state.form = action.payload
          state.message = ""
        },
      )
      .addCase(
        createFormThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
  },
  selectors: {
    selectAllForms: state => state.forms,
  },
})

export const { selectAllForms } = formsSlice.selectors
//types
type FormsSliceType = {
  forms: FormTypeAPI[] | null
  form: FormTypeAPI | null
  status: "idle" | "loading" | "failed"
  error: string | undefined
  message: string
}
