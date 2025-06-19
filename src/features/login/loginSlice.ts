import type { LoginApiType } from "./lib/zodLogin.ts"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../../api/auth/authAPI.ts"
import type { Language } from "./lib/translations.ts"

export type LoginSliceState = {
  user: LoginApiType["user"] | null
  status: "idle" | "loading" | "failed"
  error: string | null
  token: string | null
  language: Language
}

const initialState: LoginSliceState = {
  user: null,
  status: "idle",
  error: null,
  token: "",
  language: "en",
}

export const loginAsync = createAsyncThunk(
  "login/loginAsync",
  async (arg: argType, { rejectWithValue }) => {
    try {
      const response = await authAPI.getLogin(arg.email, arg.password)
      return response.data
    } catch (e: any) {
      const message = e.response?.data?.message ?? "Something went wrong"
      return rejectWithValue({ message })
    }
  },
)

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: create => ({
    choosingLanguage: create.reducer(
      (state, action: PayloadAction<Language>) => {
        state.language = action.payload
      },
    ),
  }),
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.status = "loading"
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.error = null
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = (action.payload as any)?.message ?? "Something went wrong"
      })
  },
  selectors: {
    selectLogin: state => state.user,
    selectError: state => state.error,
    selectLanguage: state => state.language,
  },
})

export const { choosingLanguage } = loginSlice.actions
export const { selectLogin, selectError, selectLanguage } = loginSlice.selectors

//type
type argType = {
  email: string
  password: string
}
