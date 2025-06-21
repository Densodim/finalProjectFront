import { usersAPI } from "../../api/users/users-api.tsx"

export default function AdminPage() {
  const users = usersAPI.getUsers()
  console.log(users)
  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  )
}
