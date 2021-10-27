import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import './App.css'
import Home from './pages/Home/Home'
import MyCollection from './pages/MyCollection/MyCollection'
import React from 'react'
import Web3 from 'web3'

const App = () => {
  React.useEffect(() => {
    async function load() {
      await loadConnectMetamask()
    }
    load()
  })

  const loadConnectMetamask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  return (
    <Router>
      <NavBar />
      <Route path='/' exact render={() => <Home />} />
      <Route path='/mycollection' exact render={() => <MyCollection />} />
    </Router>
  )
}

export default App
