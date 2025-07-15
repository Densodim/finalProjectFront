import { uploadFileToDropbox } from "./lib/uploadFileToDropbox.ts"
import type { ChangeEvent } from "react"
import { Stack } from "@mui/material"
import FileExplorer from "./components/FileExplorer.tsx"
import InputFileUploadDropbox from "./components/InputFileUploadDropbox.tsx"
import { enqueueSnackbar } from "notistack"

export default function DropboxPage() {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    try {
      if (file) {
        const dropboxPath = `/${file.name}`
        await uploadFileToDropbox(dropboxPath, file)
      }
      enqueueSnackbar("The file is successfully uploaded", {
        variant: "success",
      })
    } catch (err) {
      enqueueSnackbar(`File upload error: ${err}`, { variant: "error" })
    }
  }

  return (
    <>
      <div>
        <InputFileUploadDropbox onChange={handleFileUpload} />
      </div>

      <Stack>
        <FileExplorer />
      </Stack>
    </>
  )
}
