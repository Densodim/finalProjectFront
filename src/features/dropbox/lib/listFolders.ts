import { dbx } from "./dbx.ts"

export const listFolders = async (path = ""): Promise<string[]> => {
  try {
    const normalizedPath = path === "/" ? "" : path

    const response = await dbx.filesListFolder({ path: normalizedPath })

    const folders = response.result.entries.filter(
      entry => entry[".tag"] === "folder",
    )

    return folders.map(folder => folder.name)
  } catch (error: any) {
    console.error("Error listing folders:", error)
    throw error
  }
}
