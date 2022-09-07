import React, { useEffect, useState } from 'react'
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
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import MaterialTable from '@material-table/core'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

//EXAMPLE

const Home = () => {
  //EXAMPLE
  const { users } = useSelector((state) => state.data)
  const [filter, setFilter] = useState(false)
  const handleChange = () => {
    setFilter(!filter)
  }

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Contact', field: 'contact' },
    { title: 'Address', field: 'address' },
    {
      title: 'Action',
      render: (user) => (
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
          <Button onClick={() => history(`/viewuser/${user.id}`)}>View</Button>
        </ButtonGroup>
      ),
    },
  ]

  let dispatch = useDispatch()

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
      <MaterialTable
        title="Employee Data"
        data={users}
        columns={columns}
        options={{
          filtering: filter,
          search: true,
          pageSize: 10,
          rowsPerPageOptions: [5, 10, 200],
        }}
        actions={[
          {
            icon: () => (
              <Checkbox
                checked={filter}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            ),
            tooltip: 'Hide/Show Filter option',
            isFreeAction: true,
          },
        ]}
      />
    </div>
  )
}

export default Home
