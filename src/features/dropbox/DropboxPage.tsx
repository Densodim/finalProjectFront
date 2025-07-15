import { listFolders } from "./lib/listFolders.ts"
import { uploadFileToDropbox } from "./lib/uploadFileToDropbox.ts"
import type { ChangeEvent } from "react"

export default function DropboxPage() {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    try {
      if (file) {
        const dropboxPath = `/${file.name}`
        await uploadFileToDropbox(dropboxPath, file)
      }
      console.log("The file is successfully uploaded")
    } catch (err) {
      console.error("File upload error:", err)
    }
  }

  listFolders("/")
    .then(folders => {
      console.log("Folders in root:", folders)
    })
    .catch(err => {
      console.error("Error:", err)
    })

  return (
    <>
      <div>
        <input type="file" onChange={handleFileUpload} />
      </div>
    </>
  )
}
