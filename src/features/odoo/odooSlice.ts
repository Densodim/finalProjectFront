import type {
  zodOdooExternalResultTypeAPI,
  zodOdooFormTypeAPI,
  zodOdooQuestionTypeAPI,
  zodOdooSurveyIDTypeAPI,
} from "./lib/zodOdoo.ts"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { handleThunkError } from "../../utils/handleThunkError.ts"
import { odooAPI } from "../../api/odooAPI.ts"
import type { RejectedPayload } from "../login/authSlice.ts"
import type { RejectedType } from "../admin/adminSlice.ts"
import { fetchAllUsersThunk } from "../admin/adminSlice.ts"

const initialState: OdooSliceType = {
  form: [],
  questions: null,
  externalResult: [],
  surveyID: null,
  APIToken: "",
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
export const getAPITokenThunk = createAsyncThunk<
  APITokenType,
  string,
  RejectedType
>("odoo/APIToken", async (token, { rejectWithValue }) => {
  try {
    const response = await odooAPI.getAPIToken(token)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const getExternalResultsThunk = createAsyncThunk<
  zodOdooExternalResultTypeAPI[],
  ExternalResultsType,
  RejectedType
>(
  "odoo/getExternalResults",
  async ({ token, apiToken }, { rejectWithValue }) => {
    try {
      const response = await odooAPI.getExternalResults(token, apiToken)
      return response.data
    } catch (e: any) {
      return rejectWithValue(handleThunkError(e))
    }
  },
)

export const getSurveyIdThunk = createAsyncThunk<
  zodOdooSurveyIDTypeAPI,
  string,
  RejectedType
>("odoo/getSurveyId", async (id, { rejectWithValue }) => {
  try {
    const response = await odooAPI.getSurveyId(id)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})


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
      .addCase(getAPITokenThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        getAPITokenThunk.fulfilled,
        (state, action: PayloadAction<APITokenType>) => {
          state.status = "idle"
          state.APIToken = action.payload.apiToken
          state.message = "Ok"
        },
      )
      .addCase(
        getAPITokenThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(getExternalResultsThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        getExternalResultsThunk.fulfilled,
        (state, action: PayloadAction<zodOdooExternalResultTypeAPI[]>) => {
          state.status = "idle"
          state.externalResult = action.payload
          state.message = "Ok"
        },
      )
      .addCase(
        getExternalResultsThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(getSurveyIdThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        getSurveyIdThunk.fulfilled,
        (state, action: PayloadAction<zodOdooSurveyIDTypeAPI>) => {
          state.status = "idle"
          state.surveyID = action.payload
          state.message = "Ok"
        },
      )
      .addCase(
        getSurveyIdThunk.rejected,
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
    selectAPIToken: state => state.APIToken,
    selectExternalResult: state => state.externalResult,
    selectSurveyId: state => state.surveyID,
  },
})

export const {
  selectOdooForms,
  selectOdooStatus,
  selectOdooMessage,
  selectAPIToken,
  selectExternalResult,
  selectSurveyId,
} = odooSlice.selectors

type OdooSliceType = {
  form: zodOdooFormTypeAPI[] | null
  questions: zodOdooQuestionTypeAPI | null
  externalResult: zodOdooExternalResultTypeAPI[] | null
  surveyID: zodOdooSurveyIDTypeAPI | null
  APIToken: string
  status: "idle" | "loading" | "failed"
  error: string | undefined
  message: string
}

type APITokenType = { apiToken: string }
type ExternalResultsType = APITokenType & {
  token: string
}
