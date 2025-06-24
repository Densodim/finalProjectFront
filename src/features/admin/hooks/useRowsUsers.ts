import { useAppSelector } from "../../../app/hooks.ts"
import { selectAllUsers } from "../adminSlice.ts"

export default function useRowsUsers() {
  const users = useAppSelector(selectAllUsers)

  const rows = users?.map(el => ({
    id: el.id,
    email: el.email,
    name: el.name,
    role: el.role,
    isActive: el.isActive,
    lastLogin: el.lastLoginAt,
    createdAt: el.createdAt,
    updatedAt: el.updatedAt,
  }))

  return rows
}
