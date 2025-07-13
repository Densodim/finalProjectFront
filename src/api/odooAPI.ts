import { instance } from "./instance.ts"

export const odooAPI = {
  getSurveysList() {
    return instance.get("odoo/surveys")
  },
  getAPIToken(token: string) {
    const promise = instance.get("users/me/token", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return promise
  },
  getExternalResults(token: string, APIToken: string) {
    const promise = instance.get("external/results", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        token: APIToken,
      },
    })
    return promise
  },
}
