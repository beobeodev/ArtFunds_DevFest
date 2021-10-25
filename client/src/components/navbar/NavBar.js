import React from 'react'
import './NavBar.css'
import '../../'

const NavBar = () => {
  const connectWallet = async () => {
    console.log('Test connect')
    await window.ethereum.enable()
  }

  return (
    <nav id='main-nav'>
      <div class='container'>
        <div id='logo'>
          <a href='index.html'>ArtFunds</a>
        </div>
        <div id='navbar'>
          <ul>
            <li>
              <a href='/#' class='btn btn-nav'>
                Trang chủ
              </a>
            </li>
            <li>
              <a href='/#' class='btn btn-nav'>
                Sàn giao dịch
              </a>
            </li>
            <li>
              <a href='/#' class='btn btn-nav'>
                Bộ sưu tập
              </a>
            </li>
            <li>
              <a href='/#'>
                <i class='fas fa-user-circle fa-lg'></i>
              </a>
            </li>
            <li>
              <button className='button_connect' onClick={connectWallet}>
                Kết nối ví
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
