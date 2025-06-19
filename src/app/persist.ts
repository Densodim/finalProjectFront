import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { authSlice } from "../features/login/authSlice.ts"

const persistConfig = {
  key: "login",
  storage,
}

export const persistedLoginReducer = persistReducer(
  persistConfig,
  authSlice.reducer,
)