import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { useLocation, Link } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ background: '#000000', marginBottom: '45px' }}
      >
        <Toolbar>
          <Button
            variant="h5"
            component={Link}
            to={'/'}
            sx={{
              display: { flexGrow: 1, xs: 'none', sm: 'block' },
              textDecoration: 'none',
              color: 'white',
            }}
          >
            Home
          </Button>
          {location.pathname === '/' && (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/adduser"
            >
              Add user
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
