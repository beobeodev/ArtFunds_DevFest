import React from 'react'
import './NavBar.css'
import '../../'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const connectWallet = async () => {
    console.log('Test connect')
    await window.ethereum.enable()
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
              <a href='/#' className='btn btn-nav'>
                Trang chủ
              </a>
            </li>
            <li>
              <a href='/#' className='btn btn-nav'>
                Sàn giao dịch
              </a>
            </li>
            <li>
              <a href='/#' className='btn btn-nav'>
                Bộ sưu tập
              </a>
            </li>
            {/* <li>
              <a href='/#' className='btn btn-nav'>
                Kết nối ví
              </a>
            </li> */}
            <li>
              <a href='/#' className='btn btn-nav'>
                Tài khoản
              </a>
              <ul>
                <li>
                  <Link to='/' className='dropdown_account'>
                    Hồ sơ của tôi
                  </Link>
                </li>
                <li>
                  <a href='/mycollection'>Bộ sưu tập của tôi</a>
                </li>
                <li>
                  <a href='/creatcollection.html'>Tạo bộ sưu tập mới</a>
                </li>
              </ul>
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
