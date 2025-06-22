import type { UsersTypeAPI } from "./lib/zodUsers.ts"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RejectedPayload } from "../login/authSlice.ts"
import { adminApi } from "../../api/admin/admin-api.tsx"

const initialState: AdminSliceType = {
  users: [],
  status: "idle",
}

export const fetchAllUsers = createAsyncThunk<
  UsersTypeAPI[],
  string,
  { rejectValue: RejectedPayload }
>("admin/fetchUsers", async (token, { rejectWithValue }) => {
  try {
    const response = await adminApi.getUsers(token)
    return response.data
  } catch (e: any) {
    const message = e.payload?.message || "Error"
    return rejectWithValue({
      message,
      error: "",
      statusCode: 0,
    })
  }
})

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending, state => {
        state.status = "loading"
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<UsersTypeAPI[]>) => {
          state.status = "idle"
          state.users = action.payload
        },
      )
  },
  selectors: {
    selectAllUsers: state => state.users,
  },
})

export const { selectAllUsers } = adminSlice.selectors

//types

type AdminSliceType = {
  users: UsersTypeAPI[] | null
  status: "idle" | "loading" | "failed"
}
