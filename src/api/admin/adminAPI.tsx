import type { UserRole } from "../auth/authAPI.ts"
import { instance } from "../instance.ts"

export const adminAPI = {
  getUsers(token: string) {
    const promise = instance.get("users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return promise
  },
  getUser(token: string, id: number) {
    const promise = instance.get(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return promise
  },
  deleteUser(token: string, id: number) {
    const promise = instance.delete(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return promise
  },
  updateUser({ id, token, name, email, role, isActive }: updateUserProps) {
    const promise = instance.patch(
      `users/${id}`,
      {
        name,
        email,
        role,
        isActive,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return promise
  },
  getForms(token: string) {
    const promise = instance.get('form', {
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    return promise
  }
}
//types
export type updateUserProps = {
  token: string
  id: number
  email: string
  name: string
  role: UserRole
  isActive: boolean
}
