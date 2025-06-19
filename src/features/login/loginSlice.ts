import type { LoginApiType } from "./lib/zodLogin.ts"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../../api/auth/authAPI.ts"

export type LoginSliceState = {
  user: LoginApiType["user"]
  status: "idle" | "loading" | "failed"
  error: string | null
  token: string | null
}

const initialState: LoginSliceState = {
  user: {
    id: 0,
    email: "",
    password: "",
    name: "",
    role: "USER",
    isActive: true,
    createdAt: "",
    updatedAt: "",
    lastLoginAt: "",
  },
  status: "idle",
  error: null,
  token: '',
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
  reducers: {},
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
  },
})

export const { selectLogin, selectError } = loginSlice.selectors

//type
type argType = {
  email: string
  password: string
}
