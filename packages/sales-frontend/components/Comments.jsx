// pages/index.js
import { useState } from 'react';
import { Box, Typography, Rating, Avatar } from '@mui/material';

export default function Comments() {
  const [rating, setRating] = useState(4.8); // Example rating
  const feedbacks = [
    {
      name: 'Dianne Russell',
      time: 'Just now',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper ut lectus nec tincidunt.',
      avatar: '/dianne.jpg', // Replace with proper image URLs
      rating: 5,
    },
    {
      name: 'Courtney Henry',
      time: '2 mins ago',
      comment: 'In eu tortor viverra, tempor odio ac, pretium diam.',
      avatar: '/courtney.jpg',
      rating: 5,
    },
    {
      name: 'Darrell Steward',
      time: '21 mins ago',
      comment:
        'Vivamus fermentum consectetur ligula vel tristique. Nulla nec quam ultricies, bibendum sem quis.',
      avatar: '/darrell.jpg',
      rating: 4,
    },
    {
      name: 'Brooklyn Simmons',
      time: '1 hour ago',
      comment: 'Vestibulum tincidunt blandit odio vel finibus.',
      avatar: '/brooklyn.jpg',
      rating: 4,
    },
  ];

  return (
    <Box p={4}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Ratings & Reviews
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h3" fontWeight="bold" mr={2}>
            {rating}
          </Typography>
          <Rating value={rating} precision={0.1} readOnly />
        </Box>
        <Typography variant="body1" color="text.secondary">
          1,64,002 Ratings & 5,922 Reviews
        </Typography>
      </Box>

      {/* Individual Feedback */}
      <Box>
        {feedbacks.map((feedback, index) => (
          <Box key={index} display="flex" alignItems="flex-start" mb={3}>
            <Avatar src={feedback.avatar} alt={feedback.name} sx={{ mr: 2 }} />
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">
                  {feedback.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feedback.time}
                </Typography>
              </Box>
              <Rating value={feedback.rating} readOnly size="small" />
              <Typography variant="body2" mt={1}>
                {feedback.comment}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
