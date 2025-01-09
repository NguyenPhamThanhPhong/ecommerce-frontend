import { Box, Typography, Avatar, Divider, Stack } from '@mui/material';


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

export default function ProductRating({ratingRatios}){
    return [
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
}