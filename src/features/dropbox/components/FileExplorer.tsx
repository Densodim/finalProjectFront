import { Box, styled } from "@mui/material"
import { RichTreeView } from "@mui/x-tree-view/RichTreeView"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox"
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault"
import type { TreeViewBaseItem } from "@mui/x-tree-view"
import { TreeItem, treeItemClasses } from "@mui/x-tree-view"
import type { ReturnFileType } from "../lib/listFolders.ts"
import { listFolders } from "../lib/listFolders.ts"
import { useEffect, useState } from "react"
import { enqueueSnackbar } from "notistack"

const CustomTreeItem = styled(TreeItem)({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
})

export default function FileExplorer() {
  const [list, setList] = useState<ReturnFileType>([])
  useEffect(() => {
    listFolders("/")
      .then(folders => {
        setList(folders)
        enqueueSnackbar("File and folder successfully updated", {
          variant: "success",
        })
      })
      .catch(err => {
        enqueueSnackbar(`Error: ${err}`, { variant: "error" })
      })
  }, [])

  const MUI_X_DROPBOX: TreeViewBaseItem[] = list
    .filter(el => el[".tag"] === "folder")
    .map(folder => ({
      id: folder.id,
      label: folder.name,
      children: list
        .filter(file => file[".tag"] === "file")
        .map(file => ({
          id: file.name || "",
          label: file.name,
        })),
    }))

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <RichTreeView
        defaultExpandedItems={["grid"]}
        slots={{
          expandIcon: AddBoxIcon,
          collapseIcon: IndeterminateCheckBoxIcon,
          endIcon: DisabledByDefaultIcon,
          item: CustomTreeItem,
        }}
        items={MUI_X_DROPBOX}
      />
    </Box>
  )
}
