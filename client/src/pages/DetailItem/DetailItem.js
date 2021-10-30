import React, { useState } from "react";
import { useParams } from "react-router";
import "./DetailItem.css";
import Web3 from "web3";
import ArtFundsStorage from "../../abis/ArtFundsStorage.json";

const DetailItem = () => {
  const { idItem } = useParams();
  const [item, setItem] = useState({});

  // const [account, setAccount] =

  React.useEffect(() => {
    async function load() {
      await loadWeb3();
      await loadData();
    }
    load();
  }, [idItem]);

  const onBuyArtwork = async (e) => {
    e.preventDefault();

    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      alert("Vui lòng thêm tài khoản trong Metamask");
    } else {
      const accountAddress = accounts[0];
      if (accountAddress === item.currentOwner) {
        alert("Đây là Artwork của bạn nên không thể thực hiện giao dịch");
      } else {
        const networkId = await web3.eth.net.getId();
        const networkData = ArtFundsStorage.networks[networkId];
        const ArtFundsContract = new web3.eth.Contract(
          ArtFundsStorage.abi,
          networkData.address
        );

        await ArtFundsContract.methods
          .buyItem(parseInt(idItem))
          .send({
            from: accountAddress,
            value: web3.utils.toWei(item.price.toString(), "Ether"),
          })
          .on("confirmation", () => {
            window.location.reload();
          });
      }
    }
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(Web3.currentProvider || "http://localhost:8545");
    }
  };

  const loadData = async () => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = ArtFundsStorage.networks[networkId];
    const ArtFundsContract = new web3.eth.Contract(
      ArtFundsStorage.abi,
      networkData.address
    );

    // const itemCount = await ArtFundsContract.methods.digitalItemCounter().call()
    // console.log(itemCount)
    let obj = await ArtFundsContract.methods
      .listAllDigitalItem(parseInt(idItem))
      .call();
    obj = Object.assign({}, obj);
    const result = await fetch(obj.itemURL);
    const metaData = await result.json();
    obj.imageURL = metaData.imageURL;
    obj.price = web3.utils.fromWei(obj.price.toString(), "Ether");
    obj.description = metaData.description;
    obj.material = metaData.material;
    obj.color = metaData.color;
    obj.field = metaData.field;
    // console.log(obj)
    setItem(obj);
  };

  return (
    <div className="itemdetail_main-container">
      <div className="itemdetail_container-item">
        <div className="itemdetail_container-image">
          <img
            src={item.imageURL}
            id="image"
            className="itemdetail_image"
            alt="item"
          />
        </div>
        <div className="itemdetail_container-information">
          <div className="itemdetail_content">
            <h1 id="title">{item.name}</h1>
            {/* <h2>
              Bộ sưu tập{' '}
              <span id='collection'>
                <a href='/'>Lorem ipsum</a>
              </span>
            </h2> */}
            {/* <h2 id='author'>
              <a href='/'>Tên tác giả</a>
            </h2> */}
            <h2>
              Sở hữu bởi{" "}
              <span id="owner" className=".owner">
                {item.currentOwner}
              </span>
            </h2>
            <p id="descript">
              <span>Mô tả: </span>
              {item.description}
            </p>
          </div>
          {/* <div className='itemdetail_contract'>
            <h2>Chi tiết hợp đồng</h2>
            <div className='itemdetail_detail-contract'>
              <div>
                <b>ID Hợp đồng</b>
              </div>
              <div id='idContract'>
                {' '}
                <a href='/'>0x0a8901b0E25DEb55A87524f0cC164E9644020EBA</a>
              </div>
            </div>
          </div> */}
          <div className="itemdetail_table-properties">
            <table>
              <caption>Thuộc Tính</caption>
              <tbody>
                <tr>
                  <td id="nameProperty">Chất liệu</td>
                  <td id="valueProperty">{item.material}</td>
                </tr>
                <tr>
                  <td id="nameProperty">Màu vẽ</td>
                  <td id="valueProperty">{item.color}</td>
                </tr>
                <tr>
                  <td id="nameProperty">Phong cách</td>
                  <td id="valueProperty">{item.field}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="itemdetail_time">
            <div className="itemdetail_start">
              <p>Thời điểm mở bán</p>
              <input
                type="datetime-local"
                name="starttime"
                id="starttime"
                disabled
              />
            </div>
            <div className="itemdetail_end">
              <p>Thời điểm kết thúc</p>
              <input
                type="datetime-local"
                name="endtime"
                id="endtime"
                disabled
              />
            </div>
          </div>
          <div className="itemdetail_price">
            <h1>Giá bán hiện tại</h1>
            <h1 id="price">
              <i className="fab fa-connectdevelop">
                {" "}
                <b>{`${item.price} ETH`}</b>
              </i>
            </h1>
          </div>
          <div className="itemdetail_button-buy">
            <form>
              <button
                type="submit"
                className="itemdetail_btn-dark"
                onClick={onBuyArtwork}
              >
                Đặt Mua
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="itemdetail_container-transaction">
        <div className="itemdetail_table-buy">
          <div className="itemdetail_container-table">
            <table>
              <caption>Chi tiết giao dịch</caption>
              <tbody>
                <tr>
                  <th>Giá</th>
                  <th>Chủ sở hữu</th>
                </tr>
                <tr>
                  <td>0.007</td>
                  <td>
                    <a href="/">bedlan</a>
                  </td>
                </tr>
                <tr>
                  <td>0.007</td>
                  <td>
                    <a href="/">bedlan</a>
                  </td>
                </tr>
                <tr>
                  <td>0.007</td>
                  <td>
                    <a href="/">bedlan</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
