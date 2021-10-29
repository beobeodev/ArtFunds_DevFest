import React from 'react'
import { useParams } from 'react-router'
import './ItemDetail.css'

const ItemDetail = () => {
  const { itemID } = useParams()

  React.useEffect(() => {}, [])

  return (
    <div className='itemdetail_main-container'>
      <div className='itemdetail_container-item'>
        <div className='itemdetail_container-image'>
          <img src='image/content-jimla.jpg' id='image' className='itemdetail_image' />
        </div>
        <div className='itemdetail_container-information'>
          <div className='itemdetail_content'>
            <h1 id='title'>Lorem ipsum dolor sit amet.</h1>
            <h2>
              Bộ sưu tập{' '}
              <span id='collection'>
                <a href='/'>Lorem ipsum</a>
              </span>
            </h2>
            <h2 id='author'>
              <a href='/'>Tên tác giả</a>
            </h2>
            <h2>
              Sở hữu bởi{' '}
              <span id='owner'>
                <a href='/'>ArtFunny</a>
              </span>
            </h2>
            <p id='descript'>
              <span>Mô tả:</span> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut laborum dolores pariatur
              corporis molestiae animi quod debitis repudiandae tenetur impedit.
            </p>
          </div>
          <div className='itemdetail_contract'>
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
          </div>
          <div className='itemdetail_table-properties'>
            <table>
              <caption>Thuộc Tính</caption>
              <tr>
                <td id='nameProperty'>Chất liệu</td>
                <td id='valueProperty'>Gỗ</td>
              </tr>
              <tr>
                <td id='nameProperty'>Màu vẽ</td>
                <td id='valueProperty'>Màu nước</td>
              </tr>
              <tr>
                <td id='nameProperty'>Phong cách</td>
                <td id='valueProperty'>Hiện đại</td>
              </tr>
            </table>
          </div>

          <div className='itemdetail_time'>
            <div className='itemdetail_start'>
              <p>Thời điểm mở bán</p>
              <input type='datetime-local' name='starttime' id='starttime' disabled />
            </div>
            <div className='itemdetail_end'>
              <p>Thời điểm kết thúc</p>
              <input type='datetime-local' name='endtime' id='endtime' disabled />
            </div>
          </div>
          <div className='itemdetail_price'>
            <h1>Giá bán hiện tại</h1>
            <h1 id='price'>
              <i className='fab fa-connectdevelop'>
                {' '}
                <b> 2.5876 </b>
              </i>
            </h1>
          </div>
          <div className='itemdetail_button-buy'>
            <form action='/'>
              <button type='submit' className='itemdetail_btn-dark'>
                Đặt Mua
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className='itemdetail_container-transaction'>
        <div className='itemdetail_table-buy'>
          <div className='itemdetail_container-table'>
            <table>
              <caption>Chi tiết giao dịch</caption>
              <tr>
                <th>Giá</th>
                <th>Chủ sở hữu</th>
              </tr>
              <tr>
                <td>0.007</td>
                <td>
                  <a href='/'>bedlan</a>
                </td>
              </tr>
              <tr>
                <td>0.007</td>
                <td>
                  <a href='/'>bedlan</a>
                </td>
              </tr>
              <tr>
                <td>0.007</td>
                <td>
                  <a href='/'>bedlan</a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
