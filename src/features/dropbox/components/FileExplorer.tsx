import { Box, styled } from "@mui/material"
import { RichTreeView } from "@mui/x-tree-view/RichTreeView"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox"
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault"
import type { TreeViewBaseItem } from "@mui/x-tree-view"
import { TreeItem, treeItemClasses } from "@mui/x-tree-view"

const MUI_X_PRODUCTS: TreeViewBaseItem[] = [
  {
    id: "grid",
    label: "Data Grid",
    children: [
      { id: "grid-community", label: "@mui/x-data-grid" },
      { id: "grid-pro", label: "@mui/x-data-grid-pro" },
      { id: "grid-premium", label: "@mui/x-data-grid-premium" },
    ],
  },
  {
    id: "pickers",
    label: "Date and Time Pickers",
    children: [
      { id: "pickers-community", label: "@mui/x-date-pickers" },
      { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    children: [{ id: "charts-community", label: "@mui/x-charts" }],
  },
  {
    id: "tree-view",
    label: "Tree View",
    children: [{ id: "tree-view-community", label: "@mui/x-tree-view" }],
  },
]

const CustomTreeItem = styled(TreeItem)({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
})

export default function FileExplorer() {
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
        items={MUI_X_PRODUCTS}
      />
    </Box>
  )
}
