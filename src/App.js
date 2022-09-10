import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import { AddUser } from './pages/AddUser'
import { EditUser } from './pages/EditUser'

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/adduser" element={<AddUser />} />
        <Route exact path="/viewuser/:id" element={<EditUser />} />
      </Routes>
    </div>
  )
}

export default App
