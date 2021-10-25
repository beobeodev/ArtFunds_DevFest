import React from 'react'
import './MyCollection.css'
import img_2 from '../../assets/image/img-2.jpg'

const MyCollection = () => {
  return (
    <div class='my-collection'>
      <div class='container'>
        <div class='container-title'>
          <h1>Bộ sưu tập của tôi</h1>
        </div>
        <div class='line'></div>
        <div class='new-collection'>
          <a href='/createcollection.html' class='btn-dark'>
            Tạo bộ sưu tập
          </a>
        </div>
        <div class='collection'>
          <div class='created-collection'>
            <div class='image-cover'>
              <img src={img_2} />
            </div>
            <div class='content-cover'>Lorem ipsum dolor sit amet.</div>
          </div>
          <div class='created-collection'>
            <div class='image-cover'>
              <img src={img_2} />
            </div>
            <div class='content-cover'>Lorem ipsum dolor sit amet.</div>
          </div>
          <div class='created-collection'>
            <div class='image-cover'>
              <img src={img_2} />
            </div>
            <div class='content-cover'>Lorem ipsum dolor sit amet.</div>
          </div>
          <div class='created-collection'>
            <div class='image-cover'>
              <img src={img_2} />
            </div>
            <div class='content-cover'>Lorem ipsum dolor sit amet.</div>
          </div>
          <div class='created-collection'>
            <div class='image-cover'>
              <img src={img_2} />
            </div>
            <div class='content-cover'>Lorem ipsum dolor sit amet.</div>
          </div>
          <div class='created-collection'>
            <div class='image-cover'>
              <img src={img_2} />
            </div>
            <div class='content-cover'> Lorem ipsum dolor sit </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCollection
