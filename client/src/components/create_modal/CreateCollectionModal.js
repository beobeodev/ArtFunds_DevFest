import React, { useState } from 'react'
import './CreateCollectionModal.css'
import ReactDOM from 'react-dom'
import ipfsClient from '../../utils/ipfs'

const CreateCollectionModal = ({ isShow, onToggle, submitCreate }) => {
  // const [selectedFile, setSelectedFile] = useState()
  // const [preview, setPreview] = useState()
  const [collection, setCollection] = useState({
    name: '',
    description: '',
    url: null,
    file: null
  })

  const onSelectImage = async e => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(undefined)
      return
    }
    const file = e.target.files[0]
    const objectUrl = URL.createObjectURL(file)

    // console.log(Buffer(reader.result))
    // console.log(objectUrl)
    setCollection(prevCollection => ({
      ...prevCollection,
      url: objectUrl,
      file: file
    }))

    // I've kept this example simple by using the first image instead of multiple
    // setSelectedFile(e.target.files[0])
  }

  const handleChange = e => {
    setCollection({
      ...collection,
      [e.target.name]: e.target.value
    })
    // console.log(collection)
  }

  const onSubmitForm = async e => {
    e.preventDefault()
    try {
      const added = await ipfsClient.add(collection.file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  if (isShow) {
    return ReactDOM.createPortal(
      <div className='modal'>
        <form action='' className='modal-content' onSubmit={onSubmitForm}>
          <div className='modal_header'>
            <button type='button' className='modal_close' onClick={onToggle}>
              <span className='close'>&times;</span>
            </button>
          </div>
          <h1>Tạo bộ sưu tập mới của bạn</h1>
          <label for='logo'>Logo</label>
          {/* <input type='file' name='logo' id='logo' onChange={onSelectImage} /> */}
          {collection.url ? (
            <img src={collection.url} className='collection_image' alt='logo' />
          ) : (
            <div className='input-file-container' onChange={onSelectImage}>
              <input className='input-file' id='my-file' type='file' />
              <label tabIndex='0' htmlFor='my-file' className='input-file-trigger'>
                Tải ảnh lên
              </label>
              <p className='file-return'></p>
            </div>
          )}
          <label htmlFor='name'>Tên bộ sưu tập</label>
          <input type='text' name='name' id='nameCollection' onChange={handleChange} />
          <label htmlFor='discript'>Mô tả</label>
          <textarea name='description' id='discript' cols='30' rows='10' onChange={handleChange}></textarea>
          <button type='submit' className='btn-dark'>
            Tạo mới
          </button>
        </form>
      </div>,
      document.body
    )
  }
  return null
}

export default CreateCollectionModal
