import React from 'react'
import Web3 from 'web3'
// import ArtFundsStorage from '../../abis/ArtFundsStorage.json'

const MyProfile = () => {
  React.useEffect(() => {
    async function load() {
      await loadWeb3()
      await loadList()
    }
    load()
  }, [])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    } else if (window.web3) {
      window.web3 = new Web3(Web3.currentProvider || 'http://localhost:8545')
    } else {
      alert('Vui lòng kết nối đến Metamask')
    }
  }

  const loadList = async () => {
    // console.log(idCollection)
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    if (accounts.length === 0) {
      alert('Vui lòng thêm tài khoản trong Metamask')
    } else {
      const accountAddress = accounts[0]

      const number = await web3.eth.getBlockNumber()

      console.log(number)
      for (var i = 0; i < number; i++) {
        var block = await web3.eth.getBlock(i, true)

        if (block != null && block.transactions != null) {
          block.transactions.forEach(function (e) {
            if (accountAddress === '*' || accountAddress === e.from || accountAddress === e.to) {
              console.log(
                '  tx hash          : ' +
                  e.hash +
                  '\n' +
                  '   nonce           : ' +
                  e.nonce +
                  '\n' +
                  '   blockHash       : ' +
                  e.blockHash +
                  '\n' +
                  '   blockNumber     : ' +
                  e.blockNumber +
                  '\n' +
                  '   transactionIndex: ' +
                  e.transactionIndex +
                  '\n' +
                  '   from            : ' +
                  e.from +
                  '\n' +
                  '   to              : ' +
                  e.to +
                  '\n' +
                  '   value           : ' +
                  e.value +
                  '\n' +
                  '   gasPrice        : ' +
                  e.gasPrice +
                  '\n' +
                  '   gas             : ' +
                  e.gas +
                  '\n' +
                  '   input           : ' +
                  e.input
              )
            }
          })
        }
      }
      // const accountAddress = accounts[0]
      // const networkId = await web3.eth.net.getId()
      // const networkData = ArtFundsStorage.networks[networkId]
      // if (networkData) {
      //   const ArtFundsContract = new web3.eth.Contract(ArtFundsStorage.abi, networkData.address)
      //   const itemCount = await ArtFundsContract.methods.digitalItemCounter().call()
      //   for (var i = 1; i <= itemCount; i++) {
      //     let obj = await ArtFundsContract.methods.listAllDigitalItem(i).call()
      //     if (obj.mintedBy !== accountAddress && obj.currentOwner === accountAddress) {
      //       const result = await fetch(obj.itemURL)
      //       const metaData = await result.json()
      //       obj.imageURL = metaData.imageURL
      //       obj.price = web3.utils.fromWei(obj.price.toString(), 'Ether')
      //       obj.description = metaData.description
      //       setListItem(prevState => [...prevState, obj])
      //     }
      //   }
      // }
    }
    // console.log(listItem)
  }

  return <div></div>
}

export default MyProfile
