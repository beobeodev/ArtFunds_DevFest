import React, { useState } from 'react'
import ArtFundsStorage from '../../abis/ArtFundsStorage.json'
import Web3 from 'web3'
import { Link } from 'react-router-dom'

const MyNFT = () => {
  const [listItem, setListItem] = useState([])

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
      const networkId = await web3.eth.net.getId()
      const networkData = ArtFundsStorage.networks[networkId]
      if (networkData) {
        const ArtFundsContract = new web3.eth.Contract(ArtFundsStorage.abi, networkData.address)
        const itemCount = await ArtFundsContract.methods.digitalItemCounter().call()
        for (var i = 1; i <= itemCount; i++) {
          let obj = await ArtFundsContract.methods.listAllDigitalItem(i).call()
          if (obj.mintedBy !== accountAddress && obj.currentOwner === accountAddress) {
            const result = await fetch(obj.itemURL)
            const metaData = await result.json()
            obj.imageURL = metaData.imageURL
            obj.price = web3.utils.fromWei(obj.price.toString(), 'Ether')
            obj.description = metaData.description
            setListItem(prevState => [...prevState, obj])
          }
        }
      }
    }
    // console.log(listItem)
  }

  return (
    <div className='my-collection'>
      <div className='container'>
        <div className='container-collection'>
          <h1 id='title-collection'>Lorem ipsum dolor sit amet.</h1>
          <p id='discript-collection'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum numquam excepturi eaque quidem culpa voluptate,
            repellendus veniam aspernatur eveniet odit!
          </p>
        </div>
        {/* <script type="text/javascript" src="/js/createcollection.js"></script>
          <script type="text/javascript" src="/js/dragfile.js"></script> */}
        <div className='container-collection'>
          <div className='market_collection'>
            {listItem.map(item => (
              <div className='market_wrapped' key={item.tokenId}>
                <Link to={`/detailitem/${item.tokenId}`}>
                  <div className='market_card-image'>
                    <img src={item.imageURL} alt='item' />
                  </div>
                  <div className='market_card-content'>
                    <div id='author'>{item.name}</div>
                    <div className='market_container-content'>
                      <div id='nameItem'>{item.description}</div>
                    </div>
                  </div>
                  <div className='market_choose'>
                    <p id='price'>{`${item.price} ETH`}</p>
                    {/* <a href='/'>Xem chi tiết</a> */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyNFT
