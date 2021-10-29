import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './CreateItemModal.css'
import ipfsClient from '../../utils/ipfs'
import ArtFundsStorage from '../../abis/ArtFundsStorage.json'
import Web3 from 'web3'

const CreateItemModal = ({ isShow, onToggle, idCollection }) => {
  const [item, setItem] = useState({
    name: '',
    price: null,
    technique: '',
    material: '',
    color: '',
    field: '',
    imageURL: '',
    description: '',
    file: null
  })

  // const [account, setAccount] = useState(null)

  const onSelectImage = async e => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(undefined)
      return
    }
    const file = e.target.files[0]
    const objectUrl = URL.createObjectURL(file)

    // console.log(Buffer(reader.result))
    // console.log(objectUrl)
    setItem(prevItem => ({
      ...prevItem,
      url: objectUrl,
      file: file
    }))

    // I've kept this example simple by using the first image instead of multiple
    // setSelectedFile(e.target.files[0])
  }

  const onSubmitForm = async e => {
    e.preventDefault()
    try {
      let account

      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      if (accounts.length === 0) {
        alert('Vui lòng thêm tài khoản trong Metamask')
      } else {
        account = accounts[0]
      }

      if (account) {
        const networkId = await web3.eth.net.getId()
        const networkData = ArtFundsStorage.networks[networkId]
        if (networkData) {
          // console.log(networkId)
          const ArtFundsContract = new web3.eth.Contract(ArtFundsStorage.abi, networkData.address)
          // console.log(networkData.address)

          const added = await ipfsClient.add(item.file)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`

          const itemObject = {
            name: item.name,
            price: Number(item.price),
            technique: item.technique,
            material: item.material,
            color: item.color,
            field: item.field,
            imageURL: url,
            description: item.description
          }

          const cid = await ipfsClient.add(JSON.stringify(itemObject))
          let itemURL = `https://ipfs.infura.io/ipfs/${cid.path}`

          // await ArtFundsContract.methods
          //   .createCollection(url, collection.name, collection.description)
          //   .estimateGas({ from: account }, (err, gasAmount) => {
          //     console.log(gasAmount)
          //   })
          const price = web3.utils.toWei(item.price.toString(), 'Ether')
          // console.log(price)
          await ArtFundsContract.methods
            .mintDigitalItem(Number(idCollection), item.name, price, itemURL, true)
            .send({ from: account })
            .on('confirmation', (confNumber, receipt, latestBlockHash) => {
              console.log(receipt)
            })
            .on('error', (err, receipt) => {
              console.log(err)
              console.log(receipt)
            })
          window.location.reload()
        }
      }
    } catch (err) {
      console.log('Error create file: ', err)
    }
  }

  const handleChange = e => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  if (isShow) {
    return ReactDOM.createPortal(
      <div id='modal' className='itemModal'>
        <form className='modal-content' onSubmit={onSubmitForm}>
          <h1>Thêm NFT mới</h1>
          <button type='button' className='modal_close' onClick={onToggle}>
            <span className='close'>&times;</span>
          </button>
          <label htmlFor='name' className='itemmodal_label'>
            Tên của NFT
          </label>
          <input type='text' name='name' className='itemmodal_input' id='nameCollection' onChange={handleChange} />
          <label htmlFor='price' className='itemmodal_label'>
            Giá
          </label>
          <input name='price' id='price' className='itemmodal_input' onChange={handleChange} />
          <label htmlFor='technical' className='itemmodal_label'>
            Kỹ thuật
          </label>
          <input type='text' id='technique' name='technique' className='itemmodal_input' onChange={handleChange} />
          <label htmlFor='material' className='itemmodal_label'>
            Vật liệu
          </label>
          <input type='text' id='material' name='material' className='itemmodal_input' onChange={handleChange} />
          <label htmlFor='color' className='itemmodal_label'>
            Màu vẽ - Chất liệu
          </label>
          <input type='text' id='color' className='itemmodal_input' name='color' onChange={handleChange} />
          <label htmlFor='style' className='itemmodal_label'>
            Trường phái
          </label>
          <input type='text' id='style' className='itemmodal_input' name='field' onChange={handleChange} />
          <label htmlFor='logo' className='itemmodal_label'>
            Logo
          </label>
          {item.url ? (
            <img src={item.url} className='collection_image' alt='logo' />
          ) : (
            <div className='input-file-container' onChange={onSelectImage}>
              <input className='input-file' id='my-file' type='file' />
              <label tabIndex='0' htmlFor='my-file' className='input-file-trigger'>
                Tải ảnh lên
              </label>
              <p className='file-return'></p>
            </div>
          )}
          <label htmlFor='discript' className='itemmodal_label'>
            Mô tả
          </label>
          <textarea name='description' id='discript' cols='30' rows='10' onChange={handleChange}></textarea>
          <button type='submit' value='submit' className='btn-dark'>
            Tạo mới
          </button>
        </form>
      </div>,
      document.body
    )
  } else {
    return null
  }
}

export default CreateItemModal
