import React, { useState } from "react";
import "./ListItem.css";
import CreateItemModal from "../../components/create_item_modal/CreateItemModal";
import { useParams } from "react-router";
import ArtFundsStorage from "../../abis/ArtFundsStorage.json";
import Web3 from "web3";

const ListItem = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const { nameCollection, idCollection } = useParams();

  const onToggle = () => {
    setIsShowModal(!isShowModal);
    // console.log(isShowModal)
  };

  const [listItem, setListItem] = useState([]);

  const [description, setDescription] = useState("");

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
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      alert("Vui lòng thêm tài khoản trong Metamask");
    } else {
      const accountAddress = accounts[0];
      const networkId = await web3.eth.net.getId();
      const networkData = ArtFundsStorage.networks[networkId];
      if (networkData) {
        const ArtFundsContract = new web3.eth.Contract(
          ArtFundsStorage.abi,
          networkData.address
        );
        const totalItemUser = await ArtFundsContract.methods
          .getDigitalItemOwnerCount(accountAddress)
          .call();

        const collectionObj = await ArtFundsContract.methods
          .listAllCollection(parseInt(idCollection))
          .call();
        setDescription(collectionObj.description);

        for (var i = 0; i < totalItemUser; i++) {
          let digitalItem = await ArtFundsContract.methods
            .getDigitalItem(i, accountAddress)
            .call();
          digitalItem = Object.assign({}, digitalItem);
          // const result = await fetch(digitalItem._itemURL)
          // const metaData = await result.json()
          // console.log(metaData)

          if (digitalItem.collectionID === idCollection.toString()) {
            const result = await fetch(digitalItem.itemURL);
            const metaData = await result.json();
            // console.log(metaData)
            digitalItem.imageURL = metaData.imageURL;
            setListItem((prevState) => [...prevState, digitalItem]);
          }
        }
      }
    }
    // console.log(listItem)
  };

  return (
    <div className="my-collection">
      <div className="container">
        <div className="container-collection">
          <h1 id="title-collection">{nameCollection}</h1>
          <p id="discript-collection">{description}</p>
        </div>
        <div className="container-equip">
          <div className="search-bar">
            <form action="">
              <span className="search-icon">
                <i className="fa fa-search"></i>
              </span>
              <input
                className="input_search"
                type="search"
                id="search"
                placeholder="Tìm kiếm"
              />
            </form>
          </div>
          <div className="create-bar">
            <button id="btnCreate" className="btn-dark" onClick={onToggle}>
              Thêm NFT mới
            </button>
            <CreateItemModal
              onToggle={onToggle}
              isShow={isShowModal}
              idCollection={idCollection}
            />
          </div>
          {/* <script type="text/javascript" src="/js/createcollection.js"></script>
            <script type="text/javascript" src="/js/dragfile.js"></script> */}
        </div>
        <div className="container-collection">
          <div className="collection">
            {listItem.map((item) => (
              <div className="wrapped" key={item.tokenId}>
                <div id="logo">
                  <a href="/">
                    <img src={item.imageURL} alt="item" />
                  </a>
                </div>
                <div id="title">
                  <h2>{item.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
