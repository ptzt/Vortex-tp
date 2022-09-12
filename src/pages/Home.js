import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, loadUsers } from '../actions/actions'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useNavigate } from 'react-router-dom'
import MaterialTable from '@material-table/core'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

const Home = () => {
  const { users } = useSelector((state) => state.data)
  const [filter, setFilter] = useState(false)
  const handleChange = () => {
    setFilter(!filter)
  }

  const columns = [
    { title: 'Id', field: 'id' },
    { title: 'First name', field: 'firstName' },
    { title: 'Last name', field: 'lastName' },
    { title: 'Email', field: 'email' },
    { title: 'Contact', field: 'contact' },
    { title: 'Hire Date', field: 'hireDate' },
    { title: 'Salary', field: 'salary' },
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
            onClick={() => handleDelete(user.id, user.firstName, user.lastName)}
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

  const handleDelete = (id, firstName, lastName) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${firstName} ${lastName}?`
      )
    ) {
      dispatch(deleteUser(id))
    }
  }

  let history = useNavigate()

  return (
    <div>
      <MaterialTable
        title="Employees Data"
        data={users}
        columns={columns}
        options={{
          filtering: filter,
          search: true,
          pageSize: 10,
          rowsPerPageOptions: [5, 10, 20],
          sorting: true,
          thirdSortClick: false,
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
