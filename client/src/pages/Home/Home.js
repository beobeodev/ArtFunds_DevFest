import React from 'react'
import './Home.css'
import img_1 from '../../assets/image/img-1.jpg'

const Home = () => {
  return (
    <>
      <header class='main-header'>
        <div class='container'>
          <div class='header-content'>
            <h1>Khám Phá, Sưu Tầm và Tôn Vinh Nghệ Thuật Việt</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum beatae explicabo neque recusandae delectus
              dicta architecto consequatur harum omnis nam?
            </p>
          </div>
          <div class='header-image'>
            <img src={img_1} alt='main' />
          </div>
        </div>
      </header>
      <section class='collection'>
        <div class='container'>
          <div class='section-title'>
            <h1>Bộ sưu tập</h1>
          </div>
          <div class='section-collection'></div>
        </div>
      </section>
    </>
  )
}

export default Home
