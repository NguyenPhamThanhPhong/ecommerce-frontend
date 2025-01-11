// pages/index.jsx
import React, { useEffect } from 'react';
import RecipeReviewCard from '@shared/RecipeReviewCard';
import GallerySlider from '@components/swiper/GalleryView';
import {
  Box,
  Stack, 
} from '@mui/material';
import { useTheme } from '@mui/material';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HotSaleCard from '@components/cards/HotSaleCard';
import SuccessModal from '@components/modal/SuccessModal';
import Banner from '@components/common/Banner';
import ProductGrid from '@components/product/ProductGrid';
import ProductCard from '@components/cards/ProductCard';
import { NewsCard } from '@components/cards/NewsCard';
import { useNewsDefault } from '@components/cards/NewsUsecase';
import { v4 } from "uuid";
import useProductContext, { useFavProductContext, useProductHotContext } from '@shared-conntext/ProductContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { LabelLine, IconButtonWithText, FacilityDecorators, SubBannersDecorators, BrandsDecorators } from '@components/common/HomePageAssets';
// import ImageSwiper from '@components/ImageSwiper';
import useBlogPostContext from '@shared-conntext/BlogPostContext';
import { useGlobalCartContext } from '@shared-conntext/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppShoppingCart from '@components/common/AppShoppingCart';

const blogPosts = [
  {
    "id": "b9c19b5b-2a3d-4d56-bdfd-3cf2cfa3a947",
    "code": 101,
    "title": "HTML Blog Post",
    "createdAt": "2025-01-01T10:00:00Z",
    "deletedAt": null,
    "subtitle": "A post with HTML content",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/c/c9/Tr%E1%BB%8Bnh_C%C3%B4ng_S%C6%A1n.jpeg",
    "authorId": "f1d5e2e1-5c57-4a12-97d1-1b3a5d6c8393",
    "content": "<p>This is an <strong>HTML</strong> blog post.</p>",
    "isHtml": true,
  },
  {
    "id": "6ab2dc5f-0d39-4825-bb39-3dc64e4a8f64",
    "code": 102,
    "title": "Plain Text Blog Post",
    "createdAt": "2025-01-02T15:30:00Z",
    "deletedAt": null,
    "subtitle": "A post with plain text content",
    "imageUrl": "https://example.com/image2.jpg",
    "authorId": "42f2d098-8c91-4f7e-8d11-8c73ad5b5c7d",
    "content": "This is a plain text blog post.",
    "isHtml": false,
  }
]
const testProds = [{
  "id": "1a2b3c4d5e",
  "code": 123456789,
  "createdAt": "2025-01-03T00:27:58Z",
  // 2025-01-01T12:00:00Z
  // 2025-01-01T12:00:00Z
  "name": "Sample Product",
  "brand": {
    "id": "brand123",
    "name": "Sample Brand"
  },
  "category": {
    "id": "category456",
    "name": "Sample Category"
  },
  "status": "AVAILABLE",
  "availableDate": "2025-01-06T00:27:58Z",
  "thumbnailUrl": "https://example.com/sample-product-thumbnail.jpg",
  "imageUrls": [
    "https://example.com/sample-product-image1.jpg",
    "https://example.com/sample-product-image2.jpg"
  ],
  "discountPercent": 15.0,
  "rating": 4.5,
  "quantity": 100,
  "sold": 25,
  "price": 49.99,
  "stock": 75,
  "description": "This is a sample product description for testing purposes."
}
]


export default function HomePage() {
  const theme = useTheme();
  const standardMargin = '10px 132px'
  const { products, loadFirstPage, hasPrev, hasNext, loadNextPage, loadPrevPage, currentPage } = useProductContext();
  const { productsFav, loadFirstPageFav, hasNextFav, hasPrevFav, loadNextPageFav, loadPrevPageFav, currentPageFav } = useFavProductContext();

  const { productsHot, loadFirstPageHot, hasNextHot, hasPrevHot, loadNextPageHot, loadPrevPageHot } = useProductHotContext();

  const { blogs, setBlogs, hasPrev: hasPrevBlogs, hasNext: hasNextBlogs,
    totalPage, currentPage: currentPageHot, totalInstances,
    loadFirstPage: loadFirstBlogPage, loadNextPage: loadNextBlogPage, loadPrevPage: loadPrevBlogPage } = useBlogPostContext();
  const pub = useSnackbarStore((state) => state.pub);
  

  useEffect(() => {
    loadFirstPage({});
    loadFirstPageHot();
    loadFirstPageFav({});
    loadFirstBlogPage({});
  }, []);

  return (
    <>
      <Stack sx={{
        width: '100%',
        position: 'absolute'
      }}>
        <AppShoppingCart />
        <Banner margin={standardMargin} />
        <FacilityDecorators />
        <LabelLine margin={standardMargin} onPrev={() => { loadPrevPage({}) }}
          onNext={() => { loadNextPage({}) }} hasPrev={hasPrev} hasNext={hasNext}>
          Hot Sales
        </LabelLine>
        <ProductGrid index={currentPage} size={5} gap={2} margin={'34px 132px'} >
          {
            products.map((product, index) => {
              return (
                <ProductCard key={product.id} product={product} favorite={true} />
              );
            })
          }
        </ProductGrid>
        <LabelLine margin={standardMargin} onPrev={() => { loadPrevPageFav() }}
          onNext={() => { loadNextPageFav() }} hasPrev={hasPrevFav} hasNext={hasNextFav}>
          Hot Sales
        </LabelLine>
        <ProductGrid index={currentPageFav} size={5} gap={2} margin={'34px 132px'} >
          {
            productsFav.map((product, index) => {
              return (
                <ProductCard key={product.id} product={product} favorite={true} />
              );
            })
          }
        </ProductGrid>
        <SubBannersDecorators />
        <BrandsDecorators />
        {/* <ImageSwiper /> */}
        <LabelLine margin={standardMargin} hasPrev={hasPrevHot} hasNext={hasNextHot}
          onPrev={loadPrevPageHot} onNext={loadNextPageHot} >
          Hurry On!!
        </LabelLine>
        <ProductGrid index={currentPageHot} size={5} gap={2} margin={'34px 132px'} rowSpacing={4} columnSpacing={4} >
          {
            productsHot.map((product, index) => {
              return (
                <HotSaleCard key={product.id} product={product} />
              );
            })
          }
        </ProductGrid>
        <LabelLine margin={standardMargin}>
          Our latest news
        </LabelLine>
        <ProductGrid length={4} margin={'34px 132px'} rowSpacing={4} columnSpacing={4} >
          {/* <NewsCard {...newsCardInfo} key={v4()} /> */}
          {
            blogs.map((blog, index) => {
              const blogProps = useNewsDefault({ ...blog, pub });
              return (
                <Box key={blog.id} sx={{
                  overflow: 'hidden',
                }}>
                  <NewsCard {...blogProps} />
                </Box>
              );
            })
          }
        </ProductGrid>

      </Stack>

      {/* <RecipeReviewCard>Click me!</RecipeReviewCard> */}
    </>
  );
};
