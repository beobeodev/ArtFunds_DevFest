import React, { useState } from 'react'
import './CreateCollectionModal.css'
import ReactDOM from 'react-dom'
import ipfsClient from '../../utils/ipfs'
import ArtFundsStorage from '../../abis/ArtFundsStorage.json'
import Web3 from 'web3'

const CreateCollectionModal = ({ isShow, onToggle }) => {
  // const [selectedFile, setSelectedFile] = useState()
  // const [preview, setPreview] = useState()
  const [collection, setCollection] = useState({
    name: "",
    description: "",
    url: null,
    file: null,
  });
  const [account, setAccount] = useState(null);
  // const web3 = new Web3(Web3.currentProvider || 'http://localhost:8545')

  // const [account, setAccount] = useState(null)

  const onSelectImage = async e => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(undefined)
      return;
    }
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);

    // console.log(Buffer(reader.result))
    // console.log(objectUrl)
    setCollection((prevCollection) => ({
      ...prevCollection,
      url: objectUrl,
      file: file,
    }));

    // I've kept this example simple by using the first image instead of multiple
    // setSelectedFile(e.target.files[0])
  };

  const handleChange = (e) => {
    setCollection({
      ...collection,
      [e.target.name]: e.target.value,
    });
    // console.log(collection)
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // await window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
      //   if (accounts.length === 0) {
      //     alert('Vui lòng kết nối đến Metamask')
      //   } else {
      //     setAccount(accounts[0])
      //   }
      // })

      let web3
      let account
      if (window.ethereum) {
        web3 = new Web3(Web3.currentProvider || 'http://localhost:8545')
        const accounts = await web3.eth.getAccounts()
        if (accounts.length === 0) {
          alert('Vui lòng kết nối tài khoản trong Metamask')
        } else {
          account = accounts[0]
        }
      }

      if (account) {
        const networkId = await web3.eth.net.getId();
        const networkData = ArtFundsStorage.networks[networkId];
        console.log(networkId);
        if (networkData) {
          const ArtFundsContract = new web3.eth.Contract(ArtFundsStorage.abi, networkData.address)
          // console.log(networkData.address)
          const added = await ipfsClient.add(collection.file)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`

          // const a = await ArtFundsContract.methods
          //   .createCollection(url, collection.name, collection.description)
          //   .estimateGas({ from: account })
          // console.log(a)
          await ArtFundsContract.methods
            .createCollection(url, collection.name, collection.description)
            .send({ from: account })
            .on('confirmation', (confNumber, receipt, latestBlockHash) => {
              console.log(receipt)
            })
            .on('error', (err, receipt) => {
              console.log(err)
            });
          window.location.reload();
        }
      }
    } catch (error) {
    }
  };

  if (isShow) {
    return ReactDOM.createPortal(
      <div className="modal">
        <form action="" className="modal-content" onSubmit={onSubmitForm}>
          <div className="modal_header">
            <button type="button" className="modal_close" onClick={onToggle}>
              <span className="close">&times;</span>
            </button>
          </div>
          <h1>Tạo bộ sưu tập mới của bạn</h1>
          <label htmlFor='logo' className='collectionmodal_label'>
            Logo
          </label>
          {/* <input type='file' name='logo' id='logo' onChange={onSelectImage} /> */}
          {collection.url ? (
            <img src={collection.url} className="collection_image" alt="logo" />
          ) : (
            <div className="input-file-container" onChange={onSelectImage}>
              <input className="input-file" id="my-file" type="file" />
              <label
                tabIndex="0"
                htmlFor="my-file"
                className="input-file-trigger"
              >
                Tải ảnh lên
              </label>
              <p className="file-return"></p>
            </div>
          )}
          <label htmlFor='name' className='collectionmodal_label'>
            Tên bộ sưu tập
          </label>
          <input type='text' name='name' id='nameCollection' className='input_name' onChange={handleChange} />
          <label htmlFor='discript' className='collectionmodal_label'>
            Mô tả
          </label>
          <textarea name='description' id='discript' cols='30' rows='10' onChange={handleChange}></textarea>
          <button type='submit' className='btn-dark'>
            Tạo mới
          </button>
        </form>
      </div>,
      document.body
    );
  }
  return null;
};

export default CreateCollectionModal;
