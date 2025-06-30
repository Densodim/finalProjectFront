import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { FormTypeAPI } from "./lib/zodForms.ts"
import { adminAPI } from "../../api/adminAPI.tsx"
import { handleThunkError } from "../../utils/handleThunkError.ts"
import type { RejectedType } from "../admin/adminSlice.ts"
import type { RejectedPayload } from "../login/authSlice.ts"
import type {
  CreateFormType,
  DeleteFormType,
  FullTextSearchType,
  GetOneFormType,
  UpdateFormType,
} from "../../api/formsAPI.ts"
import { formsAPI } from "../../api/formsAPI.ts"

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
    const response = await adminAPI.getForms(token)
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

export const deleteFormThunk = createAsyncThunk<
  FormTypeAPI,
  DeleteFormType,
  RejectedType
>("forms/deleteForm", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await formsAPI.deleteForm({ id, token })
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const getOneFormThunk = createAsyncThunk<
  FormTypeAPI,
  GetOneFormType,
  RejectedType
>("forms/getForm", async ({ id, token }, { rejectWithValue }) => {
  try {
    const response = await formsAPI.getForm({ token, id })
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const updateFormThunk = createAsyncThunk<
  FormTypeAPI,
  UpdateFormType,
  RejectedType
>(
  "forms/updateForm",
  async (
    { token, id, title, description, categoryId, isPublished },
    { rejectWithValue },
  ) => {
    try {
      const response = await formsAPI.updateForm({
        token,
        id,
        title,
        description,
        categoryId,
        isPublished,
      })
      return response.data
    } catch (e: any) {
      return rejectWithValue(handleThunkError(e))
    }
  },
)

export const searchThunks = createAsyncThunk<
  ResponseMeilisearchTypes,
  FullTextSearchType,
  RejectedType
>("forms/search", async ({ token, query }, { rejectWithValue }) => {
  try {
    const response = await formsAPI.fullTextSearch({ token, query })
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const getPublishedFormThunk = createAsyncThunk<
  FormTypeAPI[],
  string,
  RejectedType
>("forms/getPublishedForm", async (token, { rejectWithValue }) => {
  try {
    const response = await formsAPI.getPublishedForm(token)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

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
      .addCase(getPublishedFormThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        getPublishedFormThunk.fulfilled,
        (state, action: PayloadAction<FormTypeAPI[]>) => {
          state.status = "idle"
          state.forms = action.payload
          state.message = ""
        },
      )
      .addCase(
        getPublishedFormThunk.rejected,
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
      .addCase(deleteFormThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(deleteFormThunk.fulfilled, state => {
        state.status = "idle"
        state.message = ""
      })
      .addCase(
        deleteFormThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(getOneFormThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        getOneFormThunk.fulfilled,
        (state, action: PayloadAction<FormTypeAPI>) => {
          state.status = "idle"
          state.form = action.payload
          state.message = ""
        },
      )
      .addCase(
        getOneFormThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(updateFormThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        updateFormThunk.fulfilled,
        (state, action: PayloadAction<FormTypeAPI>) => {
          state.status = "idle"
          state.form = action.payload
          state.message = ""
        },
      )
      .addCase(
        updateFormThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(searchThunks.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        searchThunks.fulfilled,
        (state, action: PayloadAction<ResponseMeilisearchTypes>) => {
          state.status = "idle"
          state.forms = action.payload.hits
          state.message = ""
        },
      )
      .addCase(
        searchThunks.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
  },
  selectors: {
    selectAllForms: state => state.forms,
    selectStatusForm: state => state.status,
    selectOneForm: state => state.form,
  },
})

export const { selectAllForms, selectStatusForm, selectOneForm } =
  formsSlice.selectors
//types
type FormsSliceType = {
  forms: FormTypeAPI[] | null
  form: FormTypeAPI | null
  status: "idle" | "loading" | "failed"
  error: string | undefined
  message: string
}

type ResponseMeilisearchTypes = {
  hits: FormTypeAPI[]
  query: string
  processingTimeMs: number
  limit: number
  offset: number
  estimatedTotalHits: number
}
