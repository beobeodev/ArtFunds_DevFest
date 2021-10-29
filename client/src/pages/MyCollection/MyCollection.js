import React, { useState } from 'react'
import './MyCollection.css'

// import contentJimla from '../../assets/image/content-jimla.jpg'
// import img1 from '../../assets/image/img-1.jpg'
// import img2 from '../../assets/image/img-2.jpg'
import CreateCollectionModal from '../../components/create_modal/CreateCollectionModal'
// import Web3 from 'web3'
// import ArtFundsStorage from '../../abis/ArtFundsStorage.json'
import { Link } from 'react-router-dom'
// import styles from './MyCollection.module.css'
// console.log(styles)

const MyCollection = ({ listMyCollection }) => {
  const [isShowModal, setIsShowModal] = useState(false)
  // const [listCollection, setListCollection] = useState(listMyCollection)
  // console.log(listMyCollection)
  const onToggle = () => {
    setIsShowModal(!isShowModal)
    // console.log(isShowModal)
  }

  // const submitCreate = () => {

  // }
  // const web3 = new Web3(Web3.currentProvider || 'http://localhost:8545')

  // const onTest = async () => {
  //   let account = null
  //   await window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
  //     if (accounts.length === 0) {
  //       alert('Vui lòng kết nối đến Metamask')
  //     } else {
  //       account = accounts[0]
  //     }
  //   })
  //   console.log(account)
  //   // const ArtFundsContract = new web3.eth.Contract(ArtFundsStorage.abi, account)

  //   const ArtFundsContract = new web3.eth.Contract(ArtFundsStorage.abi, '0x1E825aabB297459F297FdcF4D15580C8Db1Bc83D')

  //   // const count = await ArtFundsContract.methods.collectionCounter().call()
  //   // console.log({ count })

  //   ArtFundsContract.methods.collectionCounter().call((err, res) => {
  //     console.log('err, res', err, res)
  //   })
  //   // console.log(count)
  // }

  return (
    <div className='mycollection_my-collection'>
      <div className='mycollection_container'>
        <div className='mycollection_container-title'>
          <h1>Bộ sưu tập của tôi</h1>
        </div>
        <div className='mycollection_line'></div>
        <div className='mycollection_new-collection'>
          <button id='btnCreate' className='mycollection_btn-dark' onClick={onToggle}>
            Tạo bộ sưu tập
          </button>
          <CreateCollectionModal onToggle={onToggle} isShow={isShowModal} />
        </div>
        <div className='mycollection_container-collection'>
          <div className='mycollection_collection'>
            {listMyCollection.map(item => (
              <div className='mycollection_wrapped' key={item._id}>
                <div id='logo'>
                  <Link to={`/createNFT/${item._name}/${item._id}`}>
                    <img src={item._imageURL} alt='my collection' />
                  </Link>
                </div>
                <div id='title'>
                  <h2>{item._name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCollection
