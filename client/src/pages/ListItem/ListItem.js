import React from 'react'
import './ListItem.css'

const ListItem = () => {
  return (
    <div className='my-collection'>
      <div className='container'>
        <div className='container-collection'>
          <h1 id='title-collection'>Lorem ipsum dolor sit amet.</h1>
          <p id='discript-collection'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum numquam excepturi eaque quidem culpa voluptate,
            repellendus veniam aspernatur eveniet odit!
          </p>
        </div>
        <div className='container-equip'>
          <div className='search-bar'>
            <form action=''>
              <span className='search-icon'>
                <i className='fa fa-search'></i>
              </span>
              <input type='search' id='search' placeholder='Tìm kiếm' />
            </form>
          </div>
          <div className='create-bar'>
            <button id='btnCreate' className='btn-dark'>
              Thêm NFT mới
            </button>
            <div id='modal' className='modal'>
              <form action='/index.html' className='modal-content'>
                <h1>Thêm NFT mới</h1> <span className='close'>&times;</span>
                <label for='name'>Tên của NFT</label>
                <input type='text' name='nameCollection' id='nameCollection' />
                <label for='technical'>Kỹ thuật</label>
                <input type='text' id='technical' />
                <label for='material'>Vật liệu</label>
                <input type='text' id='material' />
                <label for='color'>Màu vẽ - Chất liệu</label>
                <input type='text' id='color' />
                <label for='style'>Trường phái</label>
                <input type='text' id='style' />
                <label for='logo'>Logo</label>
                <div className='input-file-container'>
                  <input className='input-file' id='my-file' type='file' />
                  <label tabindex='0' for='my-file' className='input-file-trigger' style='text-align: center;'>
                    Tải ảnh lên
                  </label>
                  <p className='file-return'></p>
                </div>
                <label for='discript'>Mô tả</label>
                <textarea name='discript' id='discript' cols='30' rows='10'></textarea>
                <button type='submit' className='btn-dark'>
                  Tạo mới
                </button>
              </form>
            </div>
          </div>
          {/* <script type="text/javascript" src="/js/createcollection.js"></script>
            <script type="text/javascript" src="/js/dragfile.js"></script> */}
        </div>
        <div className='container-collection'>
          <div className='collection'>
            <div className='wrapped'>
              <div id='logo'>
                <a href='#'>
                  <img src='/image/content-jimla.jpg' />
                </a>
              </div>
              <div id='title'>
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className='wrapped'>
              <div id='image-cover'>
                <a href='#'>
                  <img src='/image/img-1.jpg' />
                </a>
              </div>
              <div id='title'>
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className='wrapped'>
              <div id='image-cover'>
                <a href='#'>
                  <img src='/image/img-2.jpg' />
                </a>
              </div>
              <div id='title'>
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className='wrapped'>
              <div id='image-cover'>
                <a href='#'>
                  <img src='/image/content-jimla.jpg' />
                </a>
              </div>
              <div id='title'>
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>
            <div className='wrapped'>
              <div id='image-cover'>
                <a href='#'>
                  <img src='/image/content-jimla.jpg' />
                </a>
              </div>
              <div id='title'>
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className='wrapped'>
              <div id='image-cover'>
                <a href='#'>
                  <img src='/image/content-jimla.jpg' />
                </a>
              </div>
              <div id='title'>
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className='wrapped'>
              <div id='image-cover'>
                <a href='#'>
                  <img src='/image/img-2.jpg' />
                </a>
              </div>
              <div id='title'>
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>

            <div className='wrapped'>
              <div id='image-cover'>
                <a href='#'>
                  <img src='/image/content-jimla.jpg' />
                </a>
              </div>
              <div id='title'>
                <h2>Lorem ipsum dolor sit.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem
