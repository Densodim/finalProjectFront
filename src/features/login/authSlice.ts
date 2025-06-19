import type { LoginApiType } from "./lib/zodLogin.ts"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../../api/auth/authAPI.ts"
import type { Language } from "./lib/translations.ts"
import {
  getErrorAndStatusCode,
  messageError,
} from "./lib/getErrorAndStatusCode.ts"

const initialState: LoginSliceState = {
  user: null,
  status: "idle",
  error: null,
  token: "",
  language: "en",
  message: "",
}

export const loginAsync = createAsyncThunk<
  LoginApiType,
  argLoginType,
  { rejectValue: RejectedPayload }
>("auth/loginAsync", async (arg, { rejectWithValue }) => {
  try {
    const response = await authAPI.getLogin(arg.email, arg.password)
    return response.data
  } catch (e) {
    const message = messageError(e)
    const { error, statusCode } = getErrorAndStatusCode(e)
    return rejectWithValue({
      message,
      error,
      statusCode,
    })
  }
})

export const registerAsync = createAsyncThunk<
  LoginApiType,
  argRegisterType,
  { rejectValue: RejectedPayload }
>(
  "auth/registerAsync",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await authAPI.getRegister(email, password, name)
      return response.data
    } catch (e) {
      const message = messageError(e)
      const { error, statusCode } = getErrorAndStatusCode(e)
      return rejectWithValue({ message, error, statusCode })
    }
  },
)

export const authSlice = createSlice({
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
        state.error = action.payload ?? null
      })
      .addCase(registerAsync.pending, state => {
        state.status = "loading"
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.message = "Successfully registered"
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload ?? null
      })
  },
  selectors: {
    selectLogin: state => state.user,
    selectError: state => state.error,
    selectLanguage: state => state.language,
    selectMessage: state => state.message,
  },
})

export const { choosingLanguage } = authSlice.actions
export const { selectLogin, selectError, selectLanguage, selectMessage } = authSlice.selectors

//type
type argLoginType = {
  email: string
  password: string
}
type argRegisterType = argLoginType & {
  name: string
}
type RejectedPayload = {
  message: string
  error: string
  statusCode: number
}

export type LoginSliceState = {
  user: LoginApiType["user"] | null
  status: "idle" | "loading" | "failed"
  error: RejectedPayload | null
  token: string | null
  language: Language
  message: string | null
}
