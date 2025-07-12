import { instance } from "./instance.ts"

export const odooAPI = {
  getSurveysList() {
    return instance.get("odoo/surveys")
  },
}
