// pages/index.jsx
import React from 'react';
import RecipeReviewCard from '@shared/RecipeReviewCard';
import GallerySlider from '@components/GalleryView';
import { Box, Typography, Card, CardContent, CardMedia, Button, Icon, Avatar } from '@mui/material';
import { createTheme } from '@mui/material';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HotSaleCard from '@components/HotSaleCard';
import SuccessModal from '@components/SuccessModal';


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

// `
// <ProductCard />
// <HotSaleCard/>
// <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
//   <Card sx={{ maxWidth: 345, position: 'relative' }}>
//     <CardContent>
//       {/* Card content */}
//       <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1 }}>
//         <button>Close</button>
//       </Box>
//     </CardContent>
//   </Card>
// </Box>

// <Box height={120}
//   sx={{
//     width: '100%',
//     background: theme.palette.background.default,
//     display: 'flex', justifyContent: 'space-between',
//     alignItems: 'center'
//   }}>
//   {buttonData.map(
//     (_, index) => (<IconButtonWithText key={index} />)
//   )
//   }
// </Box>`

const HomePage = () => {
  const theme = createTheme();
  const buttonData = Array(5).fill(1);

  return (
    <>
      {/* <SuccessModal /> */}
      {/* <GallerySlider /> */}
      {/* <RoutingBreadcrumbs /> */}
      {/* <ProductFilterLayout /> */}


      {/* <RecipeReviewCard>Click me!</RecipeReviewCard> */}
    </>
  );
};

export default HomePage;
