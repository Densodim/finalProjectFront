import axios from "axios"

const setting = {
  withCredentials: true,
  headers: {},
}

export const instance = axios.create({
  baseURL: "https://final-project-server-flame.vercel.app/api/",
  ...setting,
})
