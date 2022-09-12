import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../actions/actions'

export const AddUser = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    hireDate: '',
    salary: '',
    address: '',
  })

  const [error, setError] = useState('')
  let dispatch = useDispatch()
  let history = useNavigate()

  const { firstName, lastName, email, contact, hireDate, salary, address } =
    state

  const handleInputChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!firstName || !lastName || !hireDate || !salary || !contact || !email) {
      setError('Please input all input field')
    } else {
      window.alert('Empleado agregado')
      dispatch(addUser(state))
      history('/')
      setError('')
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Add User</h2>
      {error && <h3 style={{ color: 'red', textAlign: 'center' }}>{error}</h3>}
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '45ch' },
        }}
        noValidate
        autoComplete="off"
        style={{ textAlign: 'center' }}
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="First name"
          variant="outlined"
          value={firstName}
          type="text"
          name="firstName"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Last name"
          variant="outlined"
          value={lastName}
          type="text"
          name="lastName"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          type="email"
          name="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Contact"
          variant="outlined"
          value={contact}
          type="number"
          name="contact"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={hireDate}
          type="date"
          name="hireDate"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          value={address}
          type="address"
          name="address"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Salary"
          variant="outlined"
          value={salary}
          type="number"
          name="salary"
          onChange={handleInputChange}
        />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </div>
  )
}
