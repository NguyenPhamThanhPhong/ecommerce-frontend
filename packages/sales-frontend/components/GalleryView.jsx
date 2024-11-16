import React from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// Swiper modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

// Sample images array
const images = [
  'https://picsum.photos/id/237/500/600',
  'https://picsum.photos/id/237/500/600',
  'https://picsum.photos/id/237/500/600',
  'https://picsum.photos/id/237/500/600',
  'https://picsum.photos/id/237/500/600'
];

const GallerySlider = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Swiper
        modules={[EffectCoverflow, Pagination]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3} // Show at least 3 images
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Card sx={{ boxShadow: 3 }} key={index}>
              <CardMedia
                component="img"
                height="250"
                image={image}
                alt={`Image ${index + 1}`}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default GallerySlider;
