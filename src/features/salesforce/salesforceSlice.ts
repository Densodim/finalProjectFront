import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { salesforceAPI } from "../../api/salesforceAPI"

export type SalesforceState = {
  accounts: any[]
  contacts: any[]
  leads: any[]
  objects: any[]
  demo: any
  loading: boolean
  error: string | null
}

const initialState: SalesforceState = {
  accounts: [],
  contacts: [],
  leads: [],
  objects: [],
  demo: null,
  loading: false,
  error: null,
}

export const fetchAccounts = createAsyncThunk(
  "salesforce/fetchAccounts",
  async () => {
    const res = await salesforceAPI.getAccounts()
    return res.data
  },
)
export const fetchContacts = createAsyncThunk(
  "salesforce/fetchContacts",
  async () => {
    const res = await salesforceAPI.getContacts()
    return res.data
  },
)
export const fetchLeads = createAsyncThunk(
  "salesforce/fetchLeads",
  async () => {
    const res = await salesforceAPI.getLeads()
    return res.data
  },
)
export const fetchObjects = createAsyncThunk(
  "salesforce/fetchObjects",
  async () => {
    const res = await salesforceAPI.getObjects()
    return res.data
  },
)
export const fetchDemo = createAsyncThunk("salesforce/fetchDemo", async () => {
  const res = await salesforceAPI.getDemo()
  return res.data
})

export const salesforceSlice = createSlice({
  name: "salesforce",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Accounts
      .addCase(fetchAccounts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false
        state.accounts = action.payload
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error loading"
      })
      // Contacts
      .addCase(fetchContacts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false
        state.contacts = action.payload
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error loading"
      })
      // Leads
      .addCase(fetchLeads.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false
        state.leads = action.payload
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error loading"
      })
      // Objects
      .addCase(fetchObjects.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchObjects.fulfilled, (state, action) => {
        state.loading = false
        state.objects = action.payload
      })
      .addCase(fetchObjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error loading объектов"
      })
      // Demo
      .addCase(fetchDemo.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDemo.fulfilled, (state, action) => {
        state.loading = false
        state.demo = action.payload
      })
      .addCase(fetchDemo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error loading demo"
      })
  },
})

export default salesforceSlice.reducer
