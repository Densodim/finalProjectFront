import { dbx } from "./dbx.ts"

export const uploadFileToDropbox = async (
  path: string,
  fileBlob: Blob,
): Promise<boolean> => {
  try {
    const fullPath = path.startsWith("/") ? path : `/${path}`

    const response = await dbx.filesUpload({
      path: fullPath,
      contents: fileBlob,
      mode: { ".tag": "overwrite" },
      mute: true,
    })

    console.log("Upload response:", response)

    return true
  } catch (error) {
    console.error("Error uploading file to Dropbox:", error)
    throw error
  }
}
