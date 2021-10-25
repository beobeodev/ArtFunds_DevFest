import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import './App.css'

import React from 'react'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Route path='/' exact />
    </Router>
  )
}

export default App
