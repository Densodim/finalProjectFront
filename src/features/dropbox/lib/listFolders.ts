import { dbx } from "./dbx.ts"
import type { files } from "dropbox"

export const listFolders = async (path = ""): Promise<ReturnFileType> => {
  try {
    const normalizedPath = path === "/" ? "" : path

    const response = await dbx.filesListFolder({ path: normalizedPath })

    // const folders = response.result.entries.filter(
    //   entry => entry[".tag"] === "folder",
    // )

    // return folders.map(folder => folder.name)
    return response.result.entries
  } catch (error: any) {
    console.error("Error listing folders:", error)
    throw error
  }
}

export type ReturnFileType = Array<
  | files.FileMetadataReference
  | files.FolderMetadataReference
  | files.DeletedMetadataReference
>
