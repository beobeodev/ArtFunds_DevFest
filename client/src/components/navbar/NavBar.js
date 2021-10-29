import React, { useState } from "react";
import "./NavBar.css";
import "../../";
import { Link } from "react-router-dom";
import Web3 from "web3";

const NavBar = () => {
  const [accountAddress, setAccountAddress] = useState();

  React.useEffect(() => {
    async function load() {
      let web3;
      if (window.ethereum) {
<<<<<<< HEAD
        let web3 = new Web3(Web3.currentProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
=======
        web3 = new Web3(Web3.currentProvider || 'http://localhost:8545')
        const accounts = await web3.eth.getAccounts()
>>>>>>> 34e66afc0f0eb0f9709300ca626a485e09fe6618
        if (accounts.length !== 0) {
          setAccountAddress(accounts[0]);
        }
      }
    }
    load();
  });

  const connectWallet = async () => {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        if (accounts.length === 0) {
          alert("Vui lòng thêm tài khoản Metamask");
        } else {
          setAccountAddress(accounts[0]);
        }
      });
  };

  return (
    <nav id="main-nav" className="sticky">
      <div className="container">
        <div id="logo">
          <Link to="/" className="home">
            ArtFunds
          </Link>
        </div>
        <div id="navbar">
          <ul>
            <li>
<<<<<<< HEAD
              <Link to="/#" className="btn btn-nav">
=======
              <Link to='/' className='btn btn-nav'>
>>>>>>> 34e66afc0f0eb0f9709300ca626a485e09fe6618
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="btn btn-nav">
                Thị trường
              </Link>
            </li>
<<<<<<< HEAD
            <li>
              <Link to="/#" className="btn btn-nav">
                Bộ sưu tập
              </Link>
            </li>
            <li>
              <Link to="/#" className="btn btn-nav">
                Tài khoản
              </Link>
              <ul>
                <li>
                  <Link to="/" className="dropdown_account">
=======
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
>>>>>>> 34e66afc0f0eb0f9709300ca626a485e09fe6618
                    Hồ sơ của tôi
                  </Link>
                </li>
                <li>
<<<<<<< HEAD
                  <Link to="/mycollection">Bộ sưu tập của tôi</Link>
                </li>
                <li>
                  <Link to="/mynft">Những artwork đã mua</Link>
=======
                  <Link to='/mycollection' className='dropdown_account'>
                    Bộ sưu tập của tôi
                  </Link>
                </li>
                <li>
                  <Link to='/mynft' className='dropdown_account'>
                    Những artwork đã mua
                  </Link>
>>>>>>> 34e66afc0f0eb0f9709300ca626a485e09fe6618
                </li>
              </ul>
            </li>
            <li>
              {accountAddress ? (
                <button className="button_disconnect">Đã kết nối ví</button>
              ) : (
                <button className="button_connect" onClick={connectWallet}>
                  Kết nối ví
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
