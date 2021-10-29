import React, { useState } from "react";
import "./MarketPlace.css";
import ArtFundsStorage from "../../abis/ArtFundsStorage.json";
import Web3 from "web3";

const MarketPlace = () => {
  const [listItem, setListItem] = useState([]);

  React.useEffect(() => {
    async function load() {
      await loadWeb3();
      await loadList();
    }
    load();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(Web3.currentProvider || "http://localhost:8545");
    } else {
      alert("Vui lòng kết nối đến Metamask");
    }
  };

  const loadList = async () => {
    // console.log(idCollection)
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = ArtFundsStorage.networks[networkId];
    if (networkData) {
      const ArtFundsContract = new web3.eth.Contract(
        ArtFundsStorage.abi,
        networkData.address
      );
      const itemCount = await ArtFundsContract.methods
        .digitalItemCounter()
        .call();
      console.log(itemCount);
      for (var i = 0; i < itemCount; ++i) {
        const obj = await ArtFundsContract.methods.listAllDigitalItem(i).call();
        const result = await fetch(obj.itemURL);
        const metaData = await result.json();
        obj.imageURL = metaData.imageURL;
        obj.price = web3.utils.fromWei(obj.price.toString(), "Ether");
      }
    }
    // console.log(listItem)
  };

  return (
    <div className="market_marketplace">
      <div className="market_filter-left">
        <div className="market_filter-content">
          <ul className="market_status has-child">
            <h2>Hình thức bán</h2>
            <li>
              <div className="market_checkbox">
                <input
                  type="checkbox"
                  name="onsale"
                  id="onsale"
                  value="onsale"
                  className="market_input_check"
                />
                <label htmlFor="onsale" className="market_input_label">
                  Đang bán
                </label>
              </div>
              <div className="market_checkbox">
                <input type="checkbox" name="offer" id="offer" value="offer" />
                <label htmlFor="onsale">Đặt mua</label>
              </div>
              <div className="market_checkbox">
                <input
                  type="checkbox"
                  name="auction"
                  id="auction"
                  value="auction"
                />
                <label htmlFor="onsale">Đấu giá</label>
              </div>
            </li>
          </ul>
          <ul className="market_properties has-child">
            <h2>Thuộc tính NFT</h2>
            <li>
              <div className="market_checkbox">
                <input type="checkbox" name="tech" id="tech" value="tech" />
                <label htmlFor="tech">Kỹ thuật</label>
              </div>
              <div className="market_checkbox">
                <input
                  type="checkbox"
                  name="material"
                  id="material"
                  value="material"
                />
                <label htmlFor="onsale">Vật liệu</label>
              </div>
              <div className="market_checkbox">
                <input type="checkbox" name="color" id="color" value="color" />
                <label htmlFor="color">Màu vẽ - Chất liệu</label>
              </div>
              <div className="market_checkbox">
                <input type="checkbox" name="field" id="field" value="field" />
                <label htmlFor="field">Trường phái</label>
              </div>
            </li>
          </ul>
          <ul className="market_price has-child">
            <h2>Theo giá bán</h2>
            <li>
              <input
                type="text"
                name="minprice"
                id="minprice"
                placeholder="Thấp nhất"
              />
              <input
                type="text"
                name="maxprice"
                id="maxprice"
                placeholder="Cao nhất"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="market_container-collection">
        <div className="market_search-bar">
          <form action="#">
            <span className="market_search-icon">
              <i className="fa fa-search"></i>
            </span>
            <input type="search" id="search" placeholder="Tìm kiếm" />
            <select name="list" id="list">
              <option value="all">Tất cả NFT</option>
              <option value="create">Gần đây được tạo</option>
              <option value="buy">Gần đây được bán</option>
              <option value="new">Theo tên giảm dần</option>
              <option value="new">Theo tên tăng dần</option>
            </select>
          </form>
        </div>
        <div className="market_collection">
          {listItem.map((item) => (
            <div className="market_wrapped">
              <div className="market_card-image">
                <img src={item.imageURL} />
              </div>
              <div className="market_card-content">
                <div id="author">
                  <a href="/">{item.name}</a>
                </div>
                <div className="market_container-content">
                  <div id="nameItem">{item.description}</div>
                </div>
              </div>
              <div className="market_choose">
                <p id="price">{item.price}</p>
                <a href="/">Xem chi tiết</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
