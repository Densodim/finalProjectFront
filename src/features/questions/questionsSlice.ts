import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type {
  CreateQuestionType,
  QuestionsTypeAPI,
} from "./lib/zodQuestions.ts"
import type { RejectedType } from "../admin/adminSlice.ts"
import { handleThunkError } from "../../utils/handleThunkError.ts"
import { questionsAPI } from "../../api/questionsAPI.ts"
import type { RejectedPayload } from "../login/authSlice.ts"

const initialState: QuestionsSliceType = {
  questions: [],
  question: null,
  status: "idle",
  error: "",
  message: "",
}

export const createQuestionThunk = createAsyncThunk<
  QuestionsTypeAPI,
  CreateQuestionType,
  RejectedType
>(
  "questions/createQuestion",
  async (
    { token, title, desctiption, type, order, formId, isRequired },
    { rejectWithValue },
  ) => {
    try {
      const response = await questionsAPI.createQuestions({
        formId,
        token,
        title,
        desctiption,
        type,
        order,
        isRequired
      })
      return response.data
    } catch (e: any) {
      return rejectWithValue(handleThunkError(e))
    }
  },
)

export const getQuestionsThunk = createAsyncThunk<
  QuestionsTypeAPI[],
  { token: string; id: number },
  RejectedType
>("questions/getQuestion", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await questionsAPI.getQuestions(token, id)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const deleteQuestionThunk = createAsyncThunk<
  QuestionsTypeAPI,
  { token: string; id: number },
  RejectedType
>("questions/deleteQuestion", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await questionsAPI.deleteQuestion(token, id)
    return response.data
  } catch (e: any) {
    return rejectWithValue(handleThunkError(e))
  }
})

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createQuestionThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        createQuestionThunk.fulfilled,
        (state, action: PayloadAction<QuestionsTypeAPI>) => {
          state.status = "idle"
          state.question = action.payload
          state.message = ""
        },
      )
      .addCase(
        createQuestionThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(getQuestionsThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(
        getQuestionsThunk.fulfilled,
        (state, action: PayloadAction<QuestionsTypeAPI[]>) => {
          state.status = "idle"
          state.questions = action.payload
          state.message = ""
        },
      )
      .addCase(
        getQuestionsThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
      .addCase(deleteQuestionThunk.pending, state => {
        state.status = "loading"
        state.message = "Loading ..."
      })
      .addCase(deleteQuestionThunk.fulfilled, state => {
        state.status = "idle"
        state.message = "Delete"
      })
      .addCase(
        deleteQuestionThunk.rejected,
        (state, action: PayloadAction<RejectedPayload | undefined>) => {
          state.status = "failed"
          state.error = action.payload?.message
        },
      )
  },
  selectors: {
    selectStatusQuestion: state => state.status,
    selectQuestion: state => state.question,
    selectQuestions: state => state.questions,
  },
})

export const { selectStatusQuestion, selectQuestions, selectQuestion } =
  questionsSlice.selectors

//types
type QuestionsSliceType = {
  questions: QuestionsTypeAPI[] | null
  question: QuestionsTypeAPI | null
  status: "idle" | "loading" | "failed"
  error: string | undefined
  message: string
}
