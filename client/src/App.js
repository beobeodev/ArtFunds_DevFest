import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import './App.css'
import Home from './pages/Home/Home'
import MyCollection from './pages/MyCollection/MyCollection'
import React from 'react'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Route path='/' exact render={() => <Home />} />
      <Route path='/mycollection' exact render={() => <MyCollection />} />
    </Router>
  )
}

export default App
