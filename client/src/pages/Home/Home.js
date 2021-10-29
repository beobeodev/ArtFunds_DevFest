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
<<<<<<< HEAD
              ArtFunds là nền tảng trưng bày và giao dịch tác phẩm nghệ thuật
              Việt Nam thông qua công nghệ và thị trường NFT.
=======
              ArtFunds là nền tảng trưng bày và giao dịch tác phẩm nghệ thuật Việt Nam thông qua công nghệ và thị trường
              NFT
>>>>>>> 34e66afc0f0eb0f9709300ca626a485e09fe6618
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
