import type {
  zodOdooExternalResultTypeAPI,
  zodOdooFormTypeAPI,
  zodOdooQuestionTypeAPI,
  zodOdooSurveyIDTypeAPI,
} from "./lib/zodOdoo.ts"
import { createSlice } from "@reduxjs/toolkit"

const initialState: OdooSliceType = {
  form: [],
  questions: null,
  externalResult: [],
  surveyID: null,
  status: "idle",
  error: "",
  message: "",
}

export const odooSlice = createSlice({
  name: 'odoo',
  initialState,
  reducers: {},
  // extraReducers: builder => {
  //
  // }
})

type OdooSliceType = {
  form: zodOdooFormTypeAPI[] | null
  questions: zodOdooQuestionTypeAPI | null
  externalResult: zodOdooExternalResultTypeAPI[] | null
  surveyID: zodOdooSurveyIDTypeAPI | null
  status: "idle" | "loading" | "failed"
  error: string | undefined
  message: string
}
