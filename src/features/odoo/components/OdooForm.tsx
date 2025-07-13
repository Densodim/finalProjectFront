import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { useEffect } from "react"
import {
  fetchOdooFormsThunk,
  selectOdooForms,
  selectOdooStatus,
} from "../odooSlice.ts"
import { Link } from "react-router"

const TITLE = ["ID", "title", "description"]
export default function OdooForm() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectOdooStatus)
  const odooForms = useAppSelector(selectOdooForms)

  useEffect(() => {
    dispatch(fetchOdooFormsThunk())
  }, [])

  if (status === "loading") {
    return (
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
    )
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 400 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {TITLE.map((el, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: "bold", textAlign: "center", py: 1 }}
                >
                  {el}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {odooForms?.map(row => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "center" }}
                >
                  <Link
                    to={`/odoo/surveyId/${row.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {row.id}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
