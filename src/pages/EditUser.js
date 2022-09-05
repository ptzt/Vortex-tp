import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleUser, updateUser } from '../redux/actions'

export const EditUser = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  })

  const [error, setError] = useState('')
  let dispatch = useDispatch()
  let history = useNavigate()
  let { id } = useParams()
  const { user } = useSelector((state) => state.data)
  const { name, email, contact, address } = state

  useEffect(() => {
    dispatch(getSingleUser(id))
  }, [])

  useEffect(() => {
    if (user) {
      setState({ ...user })
    }
  }, [user])

  const handleInputChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !address || !contact || !email) {
      setError('Please input all input field')
    } else {
      dispatch(updateUser(state, id))
      setError('')
      history('/')
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Edit User</h2>
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
          label="Name"
          variant="outlined"
          value={name || ''}
          type="text"
          name="name"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email || ''}
          type="email"
          name="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Contact"
          variant="outlined"
          value={contact || ''}
          type="number"
          name="contact"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          value={address || ''}
          type="text"
          name="address"
          onChange={handleInputChange}
        />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Edit
        </Button>
      </Box>
    </div>
  )
}
