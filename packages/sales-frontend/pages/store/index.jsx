'use client';
import {
    Box,
    RadioGroup, Radio,
    FormControl,FormControlLabel, 
    Avatar, Stack, Card
  } from '@mui/material';
  import { useState } from 'react';
  import RoutingBreadcrumbs from '@components/RoutingBreadCrumbs';
  import ProductFilterSidebar from '@components/product/ProductFilterSidebar';
  import { FilterLabel, FilterSelect } from '@components/product/FilterUIAssets';
  import { noFallbackAvatarUtil } from '@styles/styleUtils';
  import ProductGrid from '@components/product/ProductGrid';
  
  
  
  export default function StorePage() {
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
      console.log(option)
      setSelectedDisplay(option)
    }
    // const onSelectChange = onSelectChange || ((value) => { });
  
    return (
      <>
        <Box sx={{ display: 'block', marginBottom: '28px' }}>
          <RoutingBreadcrumbs />
        </Box>
        <Stack direction={'row'} columnGap={'24px'} sx={{ display: 'flex', }}>
          {/* Filter Sidebar */}
          <ProductFilterSidebar />
  
  
          {/* Main Content Area */}
          <Stack flex={1} rowGap={2}>
            <Card sx={{ display: 'flex', alignItems: 'center', height: '58px', padding: '0 15px' }}>
              {/* <Stack direction={'row'}>
                 */}
              <Stack direction={'row'} columnGap={2} flexGrow={1} sx={{
                padding: '0 15px',
                display: 'flex', alignItems: 'center'
              }}>
                <FilterLabel mt={0} fontSize={'14px'}>SORT BY</FilterLabel>
                <FormControl  size="small" sx={{ width:'150px' }}>
                  <FilterSelect />
                </FormControl>
              </Stack>
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
                  onChange={() => null}
                >
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
            </Card>
            {/* Sort and View Options */}
            {/* Product Grid */}
            <ProductGrid />
  
  
          </Stack>
        </Stack>
      </>
  
    );
  }
  