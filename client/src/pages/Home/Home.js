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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
              beatae explicabo neque recusandae delectus dicta architecto
              consequatur harum omnis nam?
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
