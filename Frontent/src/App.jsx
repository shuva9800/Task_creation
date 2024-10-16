import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Tasks from './components/Tasks'
import CreateTask from './components/CreateTask'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/tasks' element={<Tasks/>}/>
      <Route path='/createtask' element={<CreateTask/>}/>
    </Routes>
  )
}
