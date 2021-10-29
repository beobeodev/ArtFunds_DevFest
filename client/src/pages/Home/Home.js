import React from "react";
import "./Home.css";
import img_1 from "../../assets/image/img-1.jpg";

const Home = () => {
  return (
    <>
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <h1>Khám Phá, Sưu Tầm và Tôn Vinh Nghệ Thuật Việt</h1>
            <p>
              ArtFunds là nền tảng trưng bày và giao dịch tác phẩm nghệ thuật
              Việt Nam thông qua công nghệ và thị trường NFT
            </p>
          </div>
          <div className="header-image">
            <img src={img_1} alt="main" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;
