import type { RejectedPayload } from "../features/login/authSlice.ts"


export function handleThunkError(e: unknown): RejectedPayload {
  const error = e as any
  const message = error?.payload?.message || error?.message || "Unknown error"

  return {
    message,
    error: "",
    statusCode: 0,
  }
}