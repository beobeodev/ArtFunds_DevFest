import React, { useState } from 'react'
import Web3 from 'web3'
import './MyProfile.css'
// import ArtFundsStorage from '../../abis/ArtFundsStorage.json'

const MyProfile = () => {
  const [address, setAddress] = useState('')

  const [listObject, setListObject] = useState([])

  const [balance, setBalance] = useState(0)

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
      setAddress(accountAddress)
      const number = await web3.eth.getBlockNumber()

      let getBalance = await web3.eth.getBalance(accountAddress)
      getBalance = await web3.utils.fromWei(getBalance.toString(), 'Ether')
      setBalance(getBalance)

      // console.log(number)
      for (var i = 0; i < number; i++) {
        var block = await web3.eth.getBlock(i, true)

        var date = new Date(block.timestamp * 1000)

        if (block != null && block.transactions != null) {
          block.transactions.forEach(e => {
            if ((accountAddress === '*' || accountAddress === e.from || accountAddress === e.to) && e.value !== '0') {
              let object = {
                from: e.from,
                price: web3.utils.fromWei(e.value.toString(), 'Ether'),
                to: e.to,
                time: date.toUTCString()
              }
              setListObject(prevState => [...prevState, object])
            }
          })
        }
      }
    }
  }
  console.log(listObject)

  return (
    <div className='myprofile'>
      <div className='filter-left'>
        <div className='filter-content'>
          <ul className='status has-child'>
            <h2>Hồ sơ của tôi</h2>
            <h2 className='address'>{`Địa chỉ ví: ${address}`}</h2>
            <h2 className='address'>{`Số dư ví: ${balance} ETH`}</h2>
            <li>Chỉnh sửa hồ sơ</li>
            <li>Hoạt động của tôi</li>
          </ul>
        </div>
      </div>

      <div className='container-transaction'>
        <div className='table-activity'>
          <div className='container-table'>
            <table className='activity'>
              <tbody>
                <tr>
                  <th>Từ tài khoản</th>
                  <th>Giá NFT</th>
                  <th>Đến tài khoản</th>
                  <th>Ngày giao dịch</th>
                </tr>
                {listObject.map(item => (
                  <tr>
                    <td>
                      <a href='/'>{item.from}</a>
                    </td>
                    <td>{`${item.price} ETH`}</td>
                    <td>
                      <a href='/'>{item.to}</a>
                    </td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
