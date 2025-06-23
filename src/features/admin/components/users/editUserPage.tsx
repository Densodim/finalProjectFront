import { useParams } from "react-router"

export default function EditUserPage() {
  const param = useParams()
  console.log(param.id)
  return (
    <>
      <h1>Edit User Page</h1>
    </>
  )
}
