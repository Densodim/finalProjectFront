import { Dropbox } from "dropbox"

export const dbx = new Dropbox({
  accessToken: import.meta.env.VITE_APP_DROPBOX_ACCESS_TOKEN || "",
})
