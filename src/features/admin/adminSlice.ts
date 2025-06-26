import type { UsersTypeAPI } from "./lib/zodUsers.ts"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RejectedPayload } from "../login/authSlice.ts"
import type { updateUserProps } from "../../api/admin/adminAPI.tsx"
import { adminAPI } from "../../api/admin/adminAPI.tsx"
import { handleThunkError } from "../../utils/handleThunkError.ts"

const initialState: AdminSliceType = {
  users: [],
  user: null,
  status: "idle",
  error: "",
  message: "",
}

export const fetchAllUsersThunk = createAsyncThunk<
  UsersTypeAPI[],
  string,
  RejectedType
>("admin/fetchUsers", async (token, { rejectWithValue }) => {
  try {
    const response = await adminAPI.getUsers(token)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const fetchUserByIdThunk = createAsyncThunk<
  UsersTypeAPI,
  argUserType,
  RejectedType
>("admin/fetchUserById", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await adminAPI.getUser(token, id)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const deleteUserThunk = createAsyncThunk<
  UsersTypeAPI,
  argUserType,
  RejectedType
>("admin/deleteUserThunk", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await adminAPI.deleteUser(token, id)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const updateUserThunk = createAsyncThunk<
  UsersTypeAPI,
  updateUserProps,
  RejectedType
>(
  "admin/updateUserThunk",
  async ({ token, id, role, name, email, isActive }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateUser({
        id,
        token,
        name,
        email,
        role,
        isActive,
      })
      return response.data
    } catch (e: any) {
      return rejectWithValue(handleThunkError(e))
    }
  },
)

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsersThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        fetchAllUsersThunk.fulfilled,
        (state, action: PayloadAction<UsersTypeAPI[]>) => {
          state.status = "idle"
          state.users = action.payload
        },
      )
      .addCase(
        fetchAllUsersThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(deleteUserThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(deleteUserThunk.fulfilled, state => {
        state.status = "idle"
        state.message = "Delete successfully."
      })
      .addCase(
        deleteUserThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(fetchUserByIdThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        fetchUserByIdThunk.fulfilled,
        (state, action: PayloadAction<UsersTypeAPI>) => {
          state.status = "idle"
          state.user = action.payload
        },
      )
      .addCase(
        fetchUserByIdThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(updateUserThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<UsersTypeAPI>) => {
          state.status = "idle"
          state.user = action.payload
          state.message = "Update successfully."
        },
      )
      .addCase(
        updateUserThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
          state.message = "Error update"
        },
      )
  },
  selectors: {
    selectAllUsers: state => state.users,
    selectUser: state => state.user,
    selectStatusAdmin: state => state.status,
    selectMessageAdmin: state => state.message,
  },
})

export const {
  selectAllUsers,
  selectUser,
  selectStatusAdmin,
  selectMessageAdmin,
} = adminSlice.selectors

//types

type AdminSliceType = {
  users: UsersTypeAPI[] | null
  user: UsersTypeAPI | null
  status: "idle" | "loading" | "failed"
  error: string | undefined
  message: string
}

type argUserType = {
  token: string
  id: number
}

export type RejectedType = {
  rejectValue: RejectedPayload
}
