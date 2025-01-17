'use client';
import {
  Box,
  RadioGroup, Radio,
  FormControl, FormControlLabel,
  Avatar, Stack, Card,
  Paper,
  IconButton,
  InputBase,
  Divider,
  Pagination,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import ProductFilterSidebar from '@components/product/ProductFilterSidebar';
import { FilterLabel, FilterSelect } from '@components/product/FilterUIAssets';
import { noFallbackAvatarUtil } from '@styles/styleUtils';
import ProductGrid from '@components/product/ProductGrid';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import MenuIcon from '@mui/icons-material/Menu';
import { useProductSearchContext } from '@shared-conntext/ProductContext';
import ProductCard from '@components/cards/ProductCard';
import AppShoppingCart from '@components/common/AppShoppingCart';

export function DisplayOptions() {
  const displayOptions = [
    {
      id: 'focus',
      svg: 'focus.svg',
    },
    {
      id: 'Grid4',
      svg: 'grid4.svg',
      size: '20px'
    },
    {
      id: 'Grid8',
      svg: 'grid8.svg',
    },
    {
      id: 'List',
      svg: 'list.svg',
    },
  ];
  const [selectedDisplay, setSelectedDisplay] = useState(displayOptions[0].id);
  function handleSelectDisplay(option) {
    setSelectedDisplay(option)
  }
  return (
    <Stack direction={'row-reverse'} columnGap={2} flexGrow={1} sx={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <RadioGroup
        row
        spacing={1}
        sx={{
          alignItems: "center",
          justifyContent: "flex-end",
          columnGap: 1,
        }}
        value={displayOptions[0]}
        onChange={() => null}>
        {displayOptions.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option}
            control={
              <Radio
                checked={selectedDisplay === option.id}
                onClick={() => handleSelectDisplay(option.id)}
                icon={
                  <Avatar
                    src={option.svg}
                    variant="square"
                    sx={{
                      cursor: "pointer",
                      width: option.size || 24,
                      height: option.size || 24,
                      border: "none",
                      ...noFallbackAvatarUtil,
                    }}
                  />
                }
                checkedIcon={
                  <Avatar
                    src={option.svg}
                    variant="square"
                    sx={{
                      cursor: "pointer",
                      width: option.size || 24,
                      height: option.size || 24,
                      backgroundColor: "rgba(173,216,230,0.6)",
                    }}
                  />
                }
                sx={{
                  padding: 0,
                  "&.Mui-checked": {
                    backgroundColor: "transparent", // Remove checked state background
                  },
                  "&:hover": {
                    backgroundColor: "transparent", // Remove hover effect
                  },
                  "&:active": {
                    backgroundColor: "transparent", // Remove mousedown background
                  },
                  "&:focus-visible": {
                    backgroundColor: "transparent", // Remove focus-visible effect
                  },
                  "&.MuiTouchRipple-root": {
                    display: "none", // Disable ripple effect
                  },
                }}
              />
            }
            label=""
            sx={{
              margin: 0,
              "&.Mui-focusVisible": {
                backgroundColor: "transparent", // Remove focus state background
              },
            }}
          />
        ))}
      </RadioGroup>

      <FilterLabel mt={0} fontSize={'14px'} mr={3}>2000 PRODUCTS</FilterLabel>
    </Stack>
  )
}

export const sortbyOptions = [{
  id: 'name,asc',
  name: 'Name (A-Z)',
},
{
  id: 'name,desc',
  name: 'Name (Z-A)',
},
{
  id: 'price,asc',
  name: 'Price (Low to High)',
},
{
  id: 'price,desc',
  name: 'Price (High to Low)',
},
{
  id: 'rating,desc',
  name: 'Rating (High to Low)',
},
{
  id: 'rating,asc',
  name: 'Rating (Low to High)',
},
{
  id: 'discount,desc',
  name: 'Discount (High to Low)',
},
{
  id: 'discount,asc',
  name: 'Discount (Low to High)',
},
];

export default function StorePage() {
  const theme = useTheme();
  const {
    products,
    setSearchTerm, setBrandId, setCategoryId,
    setPriceFrom, setPriceTo,
    setRating, setDiscount, setSortby,
    page, totalPages, handlePageChange,
    submit,
  } = useProductSearchContext({ size: 8 });
  return (
    <>
      {/* <AppShoppingCart /> */}
      <Box sx={{ display: 'block', marginBottom: '28px', position: 'absolute' }}>

      </Box>
      <Stack direction={'row'} columnGap={'24px'} sx={{ display: 'flex', }}>
        {/* Filter Sidebar */}

        <ProductFilterSidebar
          onBrandChange={(e) => {
            setBrandId(e.target.value)
          }}
          onCategoryChange={(e) => setCategoryId(e.target.value)}
          onPriceFromChange={(e) => setPriceFrom(e.target.value)}
          onPriceToChange={(e) => setPriceTo(e.target.value)}
          onRatingChange={(e) => setRating(e.target.value)}
          onDiscountChange={(e) => setDiscount(e.target.value)}
        />
        {/* Main Content Area */}
        <Stack flex={1} rowGap={2}>
          <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '58px', px: 2, py: 5 }}>
            {/* <Stack direction={'row'}>
                 */}
            <Stack direction={'row'} columnGap={2} flexGrow={1} sx={{
              display: 'flex', alignItems: 'center'
            }}>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search something..."
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton onClick={submit} type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>

            </Stack>
            <Stack direction={'row'} columnGap={2} sx={{
              display: 'flex', alignItems: 'center'
            }}>
              <FilterLabel mt={0} fontSize={'14px'}>SORT BY</FilterLabel>
              <FormControl size="small" sx={{ width: '150px' }}>
                <FilterSelect onOptionChange={(e) => setSortby(e.target.value)} options={sortbyOptions} defaultOptionId={'name,asc'} />
              </FormControl>
            </Stack>
          </Card>
          {/* Sort and View Options */}
          {/* Product Grid */}
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'start',
            justifyContent: 'flex-start',
            gap: 5

          }} >
            {
              products.map((product, index) => {
                return (
                  <ProductCard key={product.id} product={product} favorite={true} />
                );
              })
            }
          </Box>
          <Paper>
            <Pagination count={totalPages} variant="outlined" shape="rounded"
              size='medium' siblingCount={1} boundaryCount={1}
              page={page}
              onChange={handlePageChange}
              sx={{
                mt: 2,
                mb: 1,
                justifyContent: 'flex-end',
                '& .MuiPagination-ul': {
                  justifyContent: 'flex-end',
                },
                // minWidth:'300px',
                '& .MuiPaginationItem-root': {
                  backgroundColor: '#E9E9E9',
                  borderRadius: '8px',
                  fontSize: 15,
                  '&:hover': {
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                  },
                },
                '& .Mui-selected': {
                  fontWeight: theme.fontWeight.semiBold,
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                }
              }}
            />
          </Paper>
        </Stack>
      </Stack>

    </>

  );
}
