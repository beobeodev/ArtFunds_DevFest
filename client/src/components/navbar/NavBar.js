import React, { useState } from 'react'
import './NavBar.css'
import '../../'
import { Link } from 'react-router-dom'
import Web3 from 'web3'

const NavBar = () => {
  const [accountAddress, setAccountAddress] = useState()

  React.useEffect(() => {
    async function load() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
      } else if (window.web3) {
        window.web3 = new Web3(Web3.currentProvider || 'http://localhost:8545')
      }
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      if (accounts.length !== 0) {
        setAccountAddress(accounts[0])
      }
    }
    load()
  })

  const connectWallet = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      if (accounts.length === 0) {
        alert('Vui lòng thêm tài khoản Metamask')
      } else {
        setAccountAddress(accounts[0])
      }
    })
  }

  return (
    <nav id='main-nav' className='sticky'>
      <div className='container'>
        <div id='logo'>
          <Link to='/' className='home'>
            ArtFunds
          </Link>
        </div>
        <div id='navbar'>
          <ul>
            <li>
              <Link to='/' className='btn btn-nav'>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to='/marketplace' className='btn btn-nav'>
                Thị trường
              </Link>
            </li>
            {/* <li>
              <a href='/#' className='btn btn-nav'>
                Kết nối ví
              </a>
            </li> */}
            <li>
              <span className='btn btn-nav'>Tài khoản</span>
              <ul>
                <li>
                  <Link to='/myprofile' className='dropdown_account'>
                    Hồ sơ của tôi
                  </Link>
                </li>
                <li>
                  <Link to='/mycollection' className='dropdown_account'>
                    Bộ sưu tập của tôi
                  </Link>
                </li>
                <li>
                  <Link to='/mynft' className='dropdown_account'>
                    Những artwork đã mua
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              {accountAddress ? (
                <button className='button_disconnect'>Đã kết nối ví</button>
              ) : (
                <button className='button_connect' onClick={connectWallet}>
                  Kết nối ví
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
