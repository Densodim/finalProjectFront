import {
  zodExportToOdooTypeAPI,
  zodLinkOdooTypeAPI,
  zodOdooExternalResultTypeAPI,
  zodOdooFormTypeAPI,
  zodOdooImportFromOdooTypeAPI,
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
  linkOdoo: null,
  importFromOdoo: null,
  exportToOdoo: null,
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

export const getLinkOdooThunk = createAsyncThunk<
  zodLinkOdooTypeAPI,
  string,
  RejectedType
>("odoo/getLinkOdoo", async (surveyId, { rejectWithValue }) => {
  try {
    const response = await odooAPI.getLinkOdoo(surveyId)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const importFromOdooThunk = createAsyncThunk<
  zodOdooImportFromOdooTypeAPI,
  number,
  RejectedType
>("odoo/importFromOdoo", async (userId, { rejectWithValue }) => {
  try {
    const response = await odooAPI.importFromOdoo(userId)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const exportToOdooThunk = createAsyncThunk<
  zodExportToOdooTypeAPI,
  number,
  RejectedType
>("odoo/exportToOdoo", async (formId, { rejectWithValue }) => {
  try {
    const response = await odooAPI.exportToOdoo(formId)
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
      .addCase(getLinkOdooThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        getLinkOdooThunk.fulfilled,
        (state, action: PayloadAction<zodLinkOdooTypeAPI>) => {
          state.status = "idle"
          state.linkOdoo = action.payload
          state.message = "Ok"
        },
      )
      .addCase(
        getLinkOdooThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(importFromOdooThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        importFromOdooThunk.fulfilled,
        (state, action: PayloadAction<zodOdooImportFromOdooTypeAPI>) => {
          state.status = "idle"
          state.importFromOdoo = action.payload
          state.message = "Ok"
        },
      )
      .addCase(
        importFromOdooThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(exportToOdooThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        exportToOdooThunk.fulfilled,
        (state, action: PayloadAction<zodExportToOdooTypeAPI>) => {
          state.status = "idle"
          state.message = action.payload.message
          state.exportToOdoo = action.payload
        },
      )
      .addCase(
        exportToOdooThunk.rejected,
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
    selectLinkOdoo: state => state.linkOdoo,
    selectImportedCountImport: state => state.importFromOdoo?.importedCount,
    selectExportCountQuestionOdoo: state=> state.exportToOdoo?.questionsCount
  },
})

export const {
  selectOdooForms,
  selectOdooStatus,
  selectOdooMessage,
  selectAPIToken,
  selectExternalResult,
  selectSurveyId,
  selectLinkOdoo,
  selectImportedCountImport,
  selectExportCountQuestionOdoo
} = odooSlice.selectors

type OdooSliceType = {
  form: zodOdooFormTypeAPI[] | null
  questions: zodOdooQuestionTypeAPI | null
  externalResult: zodOdooExternalResultTypeAPI[] | null
  surveyID: zodOdooSurveyIDTypeAPI | null
  APIToken: string
  linkOdoo: zodLinkOdooTypeAPI | null
  importFromOdoo: zodOdooImportFromOdooTypeAPI | null
  exportToOdoo: zodExportToOdooTypeAPI | null
  status: "idle" | "loading" | "failed"
  error: string | undefined
  message: string
}

type APITokenType = { apiToken: string }
type ExternalResultsType = APITokenType & {
  token: string
}
