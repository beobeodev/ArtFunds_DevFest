import React, { useState } from "react";
import "./MyCollection.css";
import contentJimla from "../../assets/image/content-jimla.jpg";
import img1 from "../../assets/image/img-1.jpg";
import img2 from "../../assets/image/img-2.jpg";
import CreateCollectionModal from "../../components/create_modal/CreateCollectionModal";
import Web3 from "web3";
import ArtFundsStorage from "../../abis/ArtFundsStorage.json";

const MyCollection = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const onToggle = () => {
    setIsShowModal(!isShowModal);
    // console.log(isShowModal)
  };

  // const onSelectImage = e => {

  // }

  // const submitCreate = () => {

  // }
  const web3 = new Web3(Web3.currentProvider || "http://localhost:8545");

  const onTest = async () => {
    let account = null;
    await window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length === 0) {
          alert("Vui lòng kết nối đến Metamask");
        } else {
          account = accounts[0];
        }
      });

    const ArtFundsContract = new web3.eth.Contract(
      ArtFundsStorage.abi,
      account
    );

    ArtFundsContract.methods.collectionCounter().call((err, res) => {
      console.log("err, res", err, res);
    });
    // const count = await ArtFundsContract.methods
    //   .getCollectionCount(account)
    //   .call();
    // console.log(count);
    // console.log(sting);
  };

  return (
    <div className="my-collection">
      <div className="container">
        <div className="container-title">
          <h1>Bộ sưu tập của tôi</h1>
        </div>
        <div className="line"></div>
        <div className="new-collection">
          <button id="btnCreate" className="btn-dark" onClick={onToggle}>
            Tạo bộ sưu tập
          </button>
          <button id="btnCreate" className="btn-dark" onClick={onTest}>
            Test
          </button>
          <CreateCollectionModal onToggle={onToggle} isShow={isShowModal} />
        </div>
        <div className="container-collection">
          <div className="collection">
            <div className="wrapped">
              <div id="logo">
                <a href="/">
                  <img src={contentJimla} alt="my collection" />
                </a>
              </div>
              <div id="title">
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className="wrapped">
              <div id="image-cover">
                <a href="/">
                  <img src={img1} alt="my collection" />
                </a>
              </div>
              <div id="title">
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className="wrapped">
              <div id="image-cover">
                <a href="/">
                  <img src={img2} alt="my collection" />
                </a>
              </div>
              <div id="title">
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className="wrapped">
              <div id="image-cover">
                <a href="/">
                  <img src={contentJimla} alt="my collection" />
                </a>
              </div>
              <div id="title">
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>
            <div className="wrapped">
              <div id="image-cover">
                <a href="/">
                  <img src={contentJimla} alt="my collection" />
                </a>
              </div>
              <div id="title">
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className="wrapped">
              <div id="image-cover">
                <a href="/">
                  <img src={contentJimla} alt="my collection" />
                </a>
              </div>
              <div id="title">
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className="wrapped">
              <div id="image-cover">
                <a href="/">
                  <img src={img2} alt="my collection" />
                </a>
              </div>
              <div id="title">
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className="wrapped">
              <div id="image-cover">
                <a href="/">
                  <img src={contentJimla} alt="my collection" />
                </a>
              </div>
              <div id="title">
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCollection;
