import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleUser, updateUser } from '../actions/actions'

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
  const { firstName, lastName, email, contact, address, salary, hireDate } =
    state
  const [disabled, setDisabled] = useState(true)
  const [show, setShow] = useState(true)

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
    if (window.confirm('Do you want to confirm the update?')) {
      if (
        !firstName ||
        !lastName ||
        !address ||
        !contact ||
        !email ||
        !salary ||
        !hireDate
      ) {
        setError('Please input all input field')
      } else {
        dispatch(updateUser(state, id))
        setError('')
        history('/')
      }
    }
  }

  const handleCancelEdit = (e) => {
    if (window.confirm('Are you sure to cancel the edit? ')) {
    } else {
      e.preventDefault()
    }
  }

  const handleEdit = (e) => {
    if (window.confirm('Are you sure?')) {
      e.preventDefault()
      setDisabled(!disabled)
      setShow(!show)
    }
  }

  function twoButtons() {
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '45ch' },
        }}
        noValidate
        autoComplete="off"
        style={{ margin: '0 auto', display: 'flex' }}
      >
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleCancelEdit}
        >
          Cancel
        </Button>
      </Box>
    )
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>User view</h2>
      {error && <h3 style={{ color: 'red', textAlign: 'center' }}>{error}</h3>}
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '45ch' },
        }}
        noValidate
        autoComplete="off"
        style={{ textAlign: 'center' }}
      >
        <TextField
          id="outlined-basic"
          label="First name"
          variant="outlined"
          value={firstName || ''}
          type="text"
          name="firstName"
          onChange={handleInputChange}
          disabled={disabled}
          InputProps={{ disableUnderline: true }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
            },
          }}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Last name"
          variant="outlined"
          value={lastName || ''}
          type="text"
          name="lastName"
          onChange={handleInputChange}
          disabled={disabled}
          InputProps={{ disableUnderline: true }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
            },
          }}
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
          disabled={disabled}
          InputProps={{ disableUnderline: true }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
            },
          }}
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
          disabled={disabled}
          InputProps={{ disableUnderline: true }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
            },
          }}
        />
        <br />
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={hireDate || ''}
          type="date"
          name="hireDate"
          onChange={handleInputChange}
          disabled={disabled}
          InputProps={{ disableUnderline: true }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
            },
          }}
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
          disabled={disabled}
          InputProps={{ disableUnderline: true }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
            },
          }}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Salary"
          variant="outlined"
          value={salary || ''}
          type="text"
          name="salary"
          onChange={handleInputChange}
          disabled={disabled}
          InputProps={{ disableUnderline: true }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
            },
          }}
        />
        <br />

        {show ? (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          twoButtons()
        )}
      </Box>
    </div>
  )
}
