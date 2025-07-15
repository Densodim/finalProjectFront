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
  getSurveyId(id: string) {
    const promise = instance.get(`odoo/survey/${id}`)
    return promise
  },
  getLinkOdoo(surveyId: string) {
    const promise = instance.get(`odoo/survey/${surveyId}/link`)
    return promise
  },
  importFromOdoo(userId: number) {
    const promise = instance.post("odoo/import-from-odoo", { userId })
    return promise
  },
  exportToOdoo(formId: number) {
    const promise = instance.post("odoo/export-to-odoo", { formId })
    return promise
  },
  getResponse(formId: string) {
    const promise = instance.get(`odoo/survey/${formId}/responses`)
    return promise
  },
}
