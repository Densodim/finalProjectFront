import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { loginSlice } from "../features/login/loginSlice.ts"

const persistConfig = {
  key: "login",
  storage,
}

export const persistedLoginReducer = persistReducer(
  persistConfig,
  loginSlice.reducer,
)