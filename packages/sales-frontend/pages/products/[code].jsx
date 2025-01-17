'use client'
import { useEffect, useState } from "react";
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
import { ProductSelector, ProductFavorite, ProductRating, ProductColorPicker, DetailDivider, ProductVariants } from "@components/product/ProductUIAssets";
import theme from "@styles/GlobalStyles";
import SmsIcon from '@mui/icons-material/Sms';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CommonTab from "@components/common/CommonTab";
import FloatingNumberInput from "@components/inputs/FloatingNumberInput";
import { useProductDetailContext } from "@shared-conntext/ProductContext";
import { useRouter } from 'next/router';
import { toLocaleString, trimString } from "@shared-utils/ConverterUtils";
import { useGlobalCartContext } from "@shared-conntext/CartContext";


const DetailLabel = ({ children }) => (
  <Typography variant="h6" fontWeight="bold" mb={1} sx={{
    fontSize: '16px',
    color: '#B9BBBF',
    fontWeight: theme.fontWeight.medium,

  }}>
    {children}
  </Typography>
)

function ReviewsAndRating({ rating }) {
  return (
    <Box ml={3} sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography variant="body2">
        <ProductRating rating={rating} fontSize={18} iconSize={30} />
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
  )
}

const ProductPage = () => {
  const router = useRouter();
  const { code } = router.query;


  const [ratingRatios, setRatingRatios] = useState(
    [
      { label: 5, ratio: 100 },
      { label: 4, ratio: 50 },
      { label: 3, ratio: 20 },
      { label: 2, ratio: 10 },
      { label: 1, ratio: 50 },
    ]
  );
  const [count, setCount] = useState(0);


  const ratingTotal = ratingRatios.reduce((acc, item) => acc + item.ratio, 0);
  const { product, fav, getProductDetail, changeFav,
    displayImage, setDisplayImage,
    variantId, changeProductImage, variants,
    colors, setColors, selectedColor, changeColor,
    tabsData } = useProductDetailContext({});
  const { cart, addToCart, removeFromCart } = useGlobalCartContext();

  function onAddToCartClick(){
    if (!localStorage) return;
    if (count <= 0) {
      removeFromCart(product.id);
    }
    else if (count > 0) {
      addToCart(product.id, count);
      router.push('/cart');
    }
  }


  useEffect(() => {
    if (code) {
      getProductDetail(code);
    }
  }, [code]);


  return (
    <>
      <Box p={3} sx={{
        display: 'flex',
        // alignItems: 'center',
      }}>
        <Stack sx={{ width: '50%', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <ProductFavorite checked={fav} onChange={changeFav} sx={{ top: 0, right: 100, width: 70, height: 80 }} />
          <Avatar variant="square" src={displayImage} sx={{
            width: '70%',
            height: '420px',
            objectFit: 'fill',
          }}>
          </Avatar>
          {product?.productImages?.length > 0 &&
            <ProductSelector
              onClick={changeProductImage}
              images={product?.productImages} onSelect={setDisplayImage} />}
        </Stack>
        <Stack sx={{ width: '50%' }}>
          {/* Title and Wishlist */}
          <Typography variant="h4" fontWeight="bold" fontSize={32}>
            {product?.name}
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{
            color: theme.palette.text.thirdary,
            fontWeight: theme.fontWeight.regular,
            fontSize: '16px',
            fontFamily: 'inter',
          }}>
            {trimString(product?.description || '', 100)}
          </Typography>
          <DetailDivider />

          {/* Price and Rating */}
          <Box display="flex" alignItems="center" justifyContent='space-between' mt={1} mb={0}>
            <Typography variant="h4" fontWeight="bold" color="primary" sx={{
              fontSize: '38px'
            }}>
              ₫{toLocaleString(product?.price * product?.discount || 1)}
            </Typography>
            <ReviewsAndRating rating={4.5} />
          </Box>
          <Typography
            variant="h5"
            sx={{ textDecoration: "line-through", ml: 1, color: "gray", fontSize: 24 }}>
            ₫{toLocaleString(product?.price || 1)}
          </Typography>
          <DetailDivider />

          {/* Color Picker */}
          <DetailLabel>Choose a Color</DetailLabel>
          <Box width={250}>
            <ProductColorPicker colorOptions={colors} itemSize={35} />
          </Box>
          {/* Variant Picker */}
          <DetailLabel>Choose a variant</DetailLabel>
          {variants?.length > 0 && <ProductVariants variants={variants} variantId={variantId}
            changeVariant={changeProductImage}
          />}

          {/* Quantity Selector */}
          <Box sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',

            flexDirection: 'row',
          }}>
            <FloatingNumberInput count={count} setCount={setCount} />

            {/* Add to Cart */}
            <Button
              startIcon={<ShoppingBagIcon />}
              variant="contained"
              color="primary"
              onClick={onAddToCartClick}
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
      <CommonTab tabsData={tabsData} />
      {/* Rating  */}
      {/* <Box>
        <CommonTab tabsData={tabsData} />
      </Box> */}
      {/* <DetailDivider /> */}
      {/* Comments */}
      {/* <Typography variant="h6" fontWeight="bold" sx={{
        fontSize: '16px',
        fontWeight: theme.fontWeight.medium,
      }}>
        Product Description
      </Typography>
      <Comments /> */}
    </>
  );
};

export default ProductPage;
