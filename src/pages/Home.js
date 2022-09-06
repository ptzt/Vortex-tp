import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, loadUsers } from '../redux/actions'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useNavigate } from 'react-router-dom'
import TablePagination from '@mui/material/TablePagination'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const Home = () => {
  let dispatch = useDispatch()
  const { users } = useSelector((state) => state.data)
  const [page, setPage] = React.useState(0)
  const [usersPerPage, setUsersPerPage] = React.useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeUserPerPage = (event) => {
    setUsersPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    dispatch(loadUsers())
  }, [])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  let history = useNavigate()

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * usersPerPage, page * usersPerPage + usersPerPage)
              .map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.contact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
                      <Button
                        color="error"
                        style={{ marginRight: '2px' }}
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                      <Button onClick={() => history(`/viewuser/${user.id}`)}>
                        View
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={users.length}
        rowsPerPage={usersPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeUserPerPage}
      />
    </div>
  )
}

export default Home
