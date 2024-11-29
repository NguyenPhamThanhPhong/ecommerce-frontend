'use client'
import { useState } from "react";
import Comments from "@components/Comments";
import {
  Box,
  Typography,
  Button,
  Slider,
  Rating,
  IconButton,
  Grid2,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClockIcon from "@mui/icons-material/AccessTime"; // Replace if using a different icon package
import RoutingBreadcrumbs from "@components/RoutingBreadCrumbs";
import { DetailDivider } from "@components/Divider";
import { ProductSelector, ProductFavorite, ProductRating, ProductColorPicker, DetailDivider } from "@components/product/ProductUIAssets";
import theme from "@styles/GlobalStyles";
import SmsIcon from '@mui/icons-material/Sms';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CommonTab from "@components/CommonTab";
import FloatingNumberInput from "@components/inputs/FloatingNumberInput";


const DetailLabel = ({ children }) => (
  <Typography variant="h6" fontWeight="bold" mb={1} sx={{
    fontSize: '16px',
    color: '#B9BBBF',
    fontWeight: theme.fontWeight.medium,

  }}>
    {children}
  </Typography>
)
const RatingSlider = ({ value, label, width, maxWidth }) => {
  maxWidth = maxWidth || 300;
  width = width || '100%';
  let ratioColor = theme.palette.success.main;
  console.log(value);
  if (value >= 15 && value < 30) {
    ratioColor = theme.palette.warning.main;
  }
  else if (value < 15) {
    ratioColor = theme.palette.error.main;
  }
  return (
    <Box sx={{ width: width, maxWidth: maxWidth, }}>
      <Box display="flex" alignItems="center" justifyContent='center'>
        <Typography variant="h6" fontSize={16} fontWeight="bold" display={'inline'}>
          {label}
        </Typography>
        <Avatar src="/products-[id]-rating.svg" sx={{
          backgroundColor: 'pink',
          width: 14, height: 14,
          mr: 1,
          maxWidth: '374px',
          pb: '1px',
          bgcolor: 'transparent'
        }} />
        <Slider
          value={value}
          max={100}
          disabled
          components={{ Thumb: () => null }} // Removes the thumb
          sx={{
            color: 'success',
            height: 8,
            '& .MuiSlider-track': {
              border: 'none',
              color: ratioColor,
            },
            '& .MuiSlider-rail': {
              color: '#FFFFFF',
              boxShadow: theme.boxShadow.default,
              border: '1px solid #000000',
            },
          }}
        />
      </Box>

    </Box>
  );
};




const ProductPage = () => {
  const [variant, setVariant] = useState("256GB");
  const [rating, setRating] = useState(3.5); // Example rating
  const [ratingRatios, setRatingRatios] = useState(
    [
      { label: 5, ratio: 100 },
      { label: 4, ratio: 50 },
      { label: 3, ratio: 20 },
      { label: 2, ratio: 10 },
      { label: 1, ratio: 50 },
    ]
  );
  const ratingTotal = ratingRatios.reduce((acc, item) => acc + item.ratio, 0);
  const tabsData = [
    {
      value: '1',
      label: 'Ratings & Reviews',
      content: (
        <Box display={'flex'} width={'100%'}>
          <Stack mb={4} sx={{
            maxWidth: '150px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography variant="h3" fontWeight="bold" display={'inline'}>
                4.8
              </Typography>
              <Avatar src="/products-[id]-rating.svg" sx={{
                ml: 2,
                bgcolor: 'transparent'
              }} />
            </Box>
            <Box width="100%" height="auto">
              <Divider sx={{ marginTop: '5px', marginBottom: '10px', borderColor: '#000000' }} />
            </Box>
            <Typography variant="body1" color="text.primary">
              1,64,002 Ratings
            </Typography>
            <Typography variant="body1" color="text.primary">
              599 Reviews
            </Typography>
          </Stack>
          <Stack spacing={{ xs: 1, sm: 2, md: 1, lg: '4px', xl: 5 }} sx={{
            width: '60%',
            ml: { xs: 4, sm: 5, md: 7, lg: 8, xl: 5 }
          }}>
            {
              ratingRatios.map((item, index) => (
                <RatingSlider key={item.label} value={item.ratio} label={item.label} maxWidth={350} />
              ))
            }
          </Stack>
        </Box>
      )
    }
  ]



  const variants = [
    {
      id: '256GB',
      display: '256GB ROM & 8GB RAM',
    },
    {
      id: '512GB',
      display: '512GB ROM & 8GB RAM',
    }
  ]


  return (
    <>
      {/* Breadcrumb */}
      <Box sx={{ display: 'block', marginBottom: '28px' }}>
        <RoutingBreadcrumbs />
      </Box>
      <Box p={3} sx={{
        display: 'flex',
        // alignItems: 'center',
      }}>
        <Stack sx={{ width: '50%', display: 'flex', alignItems: 'center' }}>
          <Avatar variant="square" src="/iphone-green.jpg" sx={{
            width: '70%',
            height: '420px',
            objectFit: 'fill',
          }}>

          </Avatar>
          <ProductSelector itemSize={70} itemGap={30} iconSize={40} />
        </Stack>
        <Stack sx={{ width: '50%', position: 'relative' }}>
          {/* Title and Wishlist */}
          <Typography variant="h4" fontWeight="bold" fontSize={32}>
            I Phone 15 pro
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{
            color: theme.palette.text.thirdary,
            fontWeight: theme.fontWeight.regular,
            fontSize: '16px',
            fontFamily: 'inter',
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          </Typography>
          <ProductFavorite />
          <DetailDivider />

          {/* Price and Rating */}
          <Box display="flex" alignItems="center" justifyContent='space-between' mt={1} mb={0}>
            <Typography variant="h4" fontWeight="bold" color="primary" sx={{
              fontSize: '38px'
            }}>
              ₹15000
            </Typography>

            <Box ml={3} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography variant="body2">
                <ProductRating fontSize={18} iconSize={30} />
                <Button variant="contained"
                  startIcon={<SmsIcon />}
                  sx={{
                    ml: 2,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '42px',
                    color: theme.palette.text.primary,
                    boxShadow: 'none',
                  }}>
                  67 Reviews
                </Button>
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h5"
            sx={{ textDecoration: "line-through", ml: 1, color: "gray", fontSize: 24 }}>
            ₹51000
          </Typography>
          <DetailDivider />

          {/* Color Picker */}
          <DetailLabel>Choose a Color</DetailLabel>
          <Box width={250}>
            <ProductColorPicker itemSize={35} />
          </Box>

          {/* Variant Picker */}
          <DetailLabel>Choose a variant</DetailLabel>
          <ToggleButtonGroup
            value={variant}
            exclusive

            onChange={(e, newVariant) => setVariant(newVariant)}
            sx={{
              mb: 2,
              gap: 4,
            }}>
            {
              variants.map((item, index) => (
                <ToggleButton key={item.id} value={item.id} sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  border: 'none',
                  '&.Mui-selected': {
                    backgroundColor: '#14d22e',
                    color: 'white',
                    border: '1px solid #000000',
                    '&:hover': {
                      backgroundColor: '#14d22e',
                      border: '1px solid #000000',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#14d22e',
                    border: '1px solid #000000',
                  },
                }}>{item.display}</ToggleButton>
              ))
            }
            {/* <ToggleButton value="512GB">512GB ROM & 8GB RAM</ToggleButton> */}
          </ToggleButtonGroup>

          {/* Quantity Selector */}
          <Box sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',

            flexDirection: 'row',
          }}>
            <FloatingNumberInput />

            {/* Add to Cart */}
            <Button
              startIcon={<ShoppingBagIcon />}
              variant="contained"
              color="primary"
              sx={{
                width: "60%", py: 2,
                borderRadius: '42px',
                height: 38 + 8,
                display: 'inline-flex',
              }}>
              Add to Cart
            </Button>
          </Box>

        </Stack>

      </Box>
      {/* Highlights Section */}
      <CommonTab />
      <Box>
        <CommonTab tabsData={tabsData} />
      </Box>
      <DetailDivider />
      <Typography variant="h6" fontWeight="bold" sx={{
        fontSize: '16px',
        fontWeight: theme.fontWeight.medium,
      }}>
        Product Description
      </Typography>


      <Comments />
    </>
  );
};

export default ProductPage;
