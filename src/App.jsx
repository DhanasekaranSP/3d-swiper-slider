import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {const fetchData = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            client_id: 'htNGRCjjflXq1AVr06NlmLwFqxdXzGjSppxoC9obYvM',
            count: 8, // Number of images you want to fetch
          },
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='container'>
      <h1 className="heading">Gallery</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        // loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
        pagination={{el:'.swiper-pagination',clickable:true}}
        navigation={{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev',clickable:true}}
        modules={[EffectCoverflow, Pagination, Navigation ]}
        className='swiper_container'
        >
        {images.map((image) => (
        <SwiperSlide key={image.id}>
          <img src={image.urls.regular} alt={image.alt_description} />
        </SwiperSlide>
      ))}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>

        </div>

        </Swiper>
    </div>
  )
}

export default App
