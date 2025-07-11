import { instance } from "./instance";

export const salesforceAPI = {
  getAccounts: () => instance.get("salesforce/accounts"),
  getContacts: () => instance.get("salesforce/contacts"),
  getLeads: () => instance.get("salesforce/leads"),
  getObjects: () => instance.get("salesforce/objects"),
  getDemo: () => instance.get("salesforce/demo"),
};
