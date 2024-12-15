// pages/index.jsx
import React from 'react';
import RecipeReviewCard from '@shared/RecipeReviewCard';
import GallerySlider from '@components/swiper/GalleryView';
import {
  Box, Typography,
  ImageList, ImageListItem,
  CardActionArea,
  Card, CardContent, CardMedia, Button, Icon, Avatar, Stack
} from '@mui/material';
import { useTheme } from '@mui/material';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HotSaleCard from '@components/product/HotSaleCard';
import SuccessModal from '@components/modal/SuccessModal';
import Banner from '@components/common/Banner';
import ProductGrid from '@components/product/ProductGrid';
import ProductCard from '@components/product/ProductCard';
import {NewsCard} from '@components/common/NewsCard';
import { useNewsDefault } from '@components/common/NewsUsecase';
import { v4 } from "uuid";
// import ImageSwiper from '@components/ImageSwiper';

function IconButtonWithText() {


  return (
    <Button
      variant="contained"
      sx={{
        display: 'flex',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxShadow: 'none',
        height: '90px', // Adjust the height as needed
        textTransform: 'none',
        gap: 2, // Adjust spacing between icon and text
        '&:hover': {
          backgroundColor: 'transparent', // Disable background color change on hover
          boxShadow: 'none', // Disable box shadow on hover
        },
      }}
    >
      <Box
        flexGrow={1}
        sx={{
          height: '100%',
          display: 'flex',
          paddingLeft: 0,
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ height: "100%", maxWidth: '30px', width: '30px' }} src='shit.svg' />
      </Box>
      <Box flexGrow={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="body1" fontWeight={'bold'}>Fast</Typography>
        <Typography variant="body2">Subtitle</Typography>
      </Box>
    </Button>
  );
}

function LabelLine({ children, margin }) {
  return (
    <Box display={'flex'} sx={{
      margin: margin,
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Typography variant="h5" fontWeight={500} sx={{
        fontSize: '18px',
        cursor: 'pointer',
        textDecoration: 'underline',
      }}>
        {children}
      </Typography>
      <Stack direction={'row'} sx={{
        columnGap: '10px',
      }}>
        <Avatar sx={{ height: '16px', width: '16px', cursor: 'pointer' }} src='pre-page.svg' />
        <Avatar sx={{ height: '16px', width: '16px', cursor: 'pointer' }} src='next-page.svg' />
      </Stack>
    </Box>
  )

}




const HomePage = () => {
  const theme = useTheme();
  const buttonData = Array(5).fill(1);
  const standardMargin = '0 132px'
  const subBanners = [
    {
      id: '1',
      image: 'sub-banner1.png',
      width: '370px',
      height: '330px'
    },
    {
      id: '2',
      image: 'sub-banner2.png',
      width: '240px',
      height: '330px'
    },
    {
      id: '3',
      image: 'sub-banner3.png',
      width: '240px',
      height: '330px'
    },
    {
      id: '4',
      image: 'sub-banner4.png',
      width: '240px',
      height: '330px'
    }
  ]

  const newsCardInfo = useNewsDefault();
  return (
    <>
      {/* <SuccessModal /> */}
      {/* <GallerySlider /> */}
      {/* <ProductFilterLayout /> */}
      <Stack sx={{
        width: '100%',
      }}>
        <Banner margin={standardMargin} />

        <Box height={120}
          sx={{
            marginTop: '36px',
            marginBottom: '25px',
            padding: '0 139px',
            width: '100%',
            background: '#ffffff',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          {buttonData.map(
            (_, index) => (<IconButtonWithText key={index} />)
          )
          }
        </Box>

        <LabelLine margin={standardMargin}>
          Hot Sales
        </LabelLine>
        <ProductGrid length={5} margin={'34px 132px'} >
          <ProductCard />
        </ProductGrid>
        <LabelLine margin={standardMargin}>
          Featured Collection
        </LabelLine>
        <ProductGrid length={5} margin={'34px 132px'} >
          <ProductCard />
        </ProductGrid>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '41px',
          height: '330px',
          columnGap: '30px',
          margin: standardMargin,
        }}>
          {
            subBanners.map((banner, index) => (
              <Avatar key={banner.id} variant='square'
                src={banner.image}
                sx={{
                  width: banner.width,
                  height: banner.height,
                  objectFit: 'fill',
                }} />
            ))
          }

        </Box>
        <Box height={120}
          sx={{
            marginTop: '36px',
            marginBottom: '25px',
            padding: '0 139px',
            width: '100%',
            background: '#ffffff',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          {Array(12).fill(1).map(
            (_, index) => (<IconButtonWithText key={index} />)
          )
          }
        </Box>
        {/* <ImageSwiper /> */}
        <LabelLine margin={standardMargin}>
          Featured Collection
        </LabelLine>
        <ProductGrid length={5} margin={'34px 132px'} rowSpacing={4} columnSpacing={4} >
          <HotSaleCard />
        </ProductGrid>
        <LabelLine margin={standardMargin}>
          Our latest news
        </LabelLine>
        <ProductGrid length={4} margin={'34px 132px'} rowSpacing={4} columnSpacing={4} >
          <NewsCard {...newsCardInfo} key={v4()}
          />
        </ProductGrid>

      </Stack>





      {/* <RecipeReviewCard>Click me!</RecipeReviewCard> */}
    </>
  );
};

export default HomePage;
