import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, loadUsers } from '../redux/actions'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useNavigate } from 'react-router-dom'
import MaterialTable from '@material-table/core'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

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
