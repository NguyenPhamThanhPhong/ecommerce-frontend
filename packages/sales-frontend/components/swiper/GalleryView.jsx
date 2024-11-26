'use client';
import React from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// Swiper modules
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Sample images array
const images = [
  'https://picsum.photos/id/237/500/600',
  'https://picsum.photos/id/237/500/600',
  'https://picsum.photos/id/237/500/600',
  'https://picsum.photos/id/237/500/600',

];

const GallerySlider = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <style>
        {`
          .card-wrapper {
            padding-left: 50px;
            margin-right: 50px;
          }

          .swiper-button-next,
          .swiper-button-prev {
          margin-left: -20px;
            color: red;
            font-weight: 800;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            color: #808080; /* Change on hover */
          }
        `}
      </style>
      <Swiper
        modules={[Pagination, Navigation]}
        enabled={true}
        spaceBetween={50}
        slidesOffsetAfter={100}
        grabCursor={true}
        slidesPerView={3} // Show at least 3 images
        navigation={{
          enabled: true,
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
