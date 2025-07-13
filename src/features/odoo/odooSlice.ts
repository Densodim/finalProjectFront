import type {
  zodOdooExternalResultTypeAPI,
  zodOdooFormTypeAPI,
  zodOdooQuestionTypeAPI,
  zodOdooSurveyIDTypeAPI,
} from "./lib/zodOdoo.ts"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { handleThunkError } from "../../utils/handleThunkError.ts"
import { odooAPI } from "../../api/odooAPI.ts"
import type { RejectedPayload } from "../login/authSlice.ts"
import { fetchAllUsersThunk } from "../admin/adminSlice.ts"

const initialState: OdooSliceType = {
  form: [],
  questions: null,
  externalResult: [],
  surveyID: null,
  status: "idle",
  error: "",
  message: "",
}

export const fetchOdooFormsThunk = createAsyncThunk(
  "odoo/fetchForms",
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await odooAPI.getSurveysList()
      return response.data
    } catch (e: any) {
      return rejectWithValue(handleThunkError(e))
    }
  },
)

export const odooSlice = createSlice({
  name: "odoo",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOdooFormsThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        fetchOdooFormsThunk.fulfilled,
        (state, action: PayloadAction<zodOdooFormTypeAPI[]>) => {
          state.status = "idle"
          state.form = action.payload
          state.message = "Ok"
        },
      )
      .addCase(
        fetchAllUsersThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
  },
  selectors: {
    selectOdooForms: state => state.form,
    selectOdooStatus: state => state.status,
    selectOdooMessage: state => state.message,
  },
})

export const { selectOdooForms, selectOdooStatus, selectOdooMessage } =
  odooSlice.selectors

type OdooSliceType = {
  form: zodOdooFormTypeAPI[] | null
  questions: zodOdooQuestionTypeAPI | null
  externalResult: zodOdooExternalResultTypeAPI[] | null
  surveyID: zodOdooSurveyIDTypeAPI | null
  status: "idle" | "loading" | "failed"
  error: string | undefined
  message: string
}
