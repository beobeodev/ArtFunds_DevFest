import React, { useState } from 'react'
import './CreateCollectionModal.css'
import ReactDOM from 'react-dom'

const CreateCollectionModal = ({ isShow, onToggle, submitCreate }) => {
  // const [selectedFile, setSelectedFile] = useState()
  // const [preview, setPreview] = useState()
  const [collection, setCollection] = useState({
    name: '',
    description: '',
    url: ''
  })

  const onSelectImage = e => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(e.target.files[0])
    // console.log(objectUrl)
    setCollection({
      ...collection,
      url: objectUrl
    })

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

  const onSubmitForm = e => {
    e.preventDefault()
    
  }

  if (isShow) {
    return ReactDOM.createPortal(
      <div className='modal'>
        <form action='' className='modal-content' onSubmit={onSubmitForm}>
          <div className='modal_header'>
            <button type='button' className='modal_close' onClick={onToggle}>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <h1>Tạo bộ sưu tập mới của bạn</h1>
          {collection.url && <img src={collection.url} />}
          <input type='file' name='logo' id='logo' onChange={onSelectImage} />
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
