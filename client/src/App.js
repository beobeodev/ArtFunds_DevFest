import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import './App.css'
import Home from './pages/Home/Home'
import MyCollection from './pages/MyCollection/MyCollection'
import React, { useState } from 'react'
import Web3 from 'web3'
import ArtFundsStorage from './abis/ArtFundsStorage.json'
import ListItem from './pages/ListItem/ListItem'
import MarketPlace from './pages/MarketPlace/MarketPlace'
import DetailItem from './pages/DetailItem/DetailItem'
import MyNFT from './components/MyNFT/MyNFT'

const App = () => {
  const [allCollectionUser, setAllCollectionUser] = useState([])

  React.useEffect(() => {
    async function load() {
      await loadWeb3()
      await loadBlockchainData()
    }
    load()
  }, [])
  // const loadConnectMetamask = async () => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   } else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  //   }
  // }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(Web3.currentProvider || 'http://localhost:8545')
    } else {
      // alert('Vui lòng kết nối đến Metamask')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    if (accounts.length === 0) {
      alert('Vui lòng thêm tài khoản trong Metamask')
    } else {
      const accountAddress = accounts[0]
      const networkId = await web3.eth.net.getId()
      const networkData = ArtFundsStorage.networks[networkId]
      if (networkData) {
        const ArtFundsContract = new web3.eth.Contract(ArtFundsStorage.abi, networkData.address)
        const totalCollectionUser = await ArtFundsContract.methods.getCollectionCount(accountAddress).call()
        // console.log(totalCollectionUser)
        for (var i = 0; i < totalCollectionUser; i++) {
          const collectionItem = await ArtFundsContract.methods.getCollection(i, accountAddress).call()
          setAllCollectionUser(prevState => [...prevState, collectionItem])
        }
      }
    }
  }

  return (
    <Router>
      <NavBar />
      <Route path='/' exact render={() => <Home />} />
      <Route path='/mycollection' render={() => <MyCollection listMyCollection={allCollectionUser} />} />
      <Route path='/createNFT/:nameCollection/:idCollection' render={() => <ListItem />} />
      <Route path='/marketplace' render={() => <MarketPlace />} />
      <Route path='/detailitem/:idItem' render={() => <DetailItem />} />
      <Route path='/mynft' render={() => <MyNFT />} />
    </Router>
  )
}

export default App
