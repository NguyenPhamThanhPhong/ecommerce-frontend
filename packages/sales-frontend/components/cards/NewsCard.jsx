import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import theme from '@styles/GlobalStyles';
import { fromIsoToSimpleDate } from '@shared-utils/ConverterUtils';
import DOMPurify from "dompurify";
import { useRouter } from 'next/router';


const TextOnly = ({ text }) => {
  return (
    <Typography gutterBottom variant="body1" component="div" sx={{
      fontSize: '12px',
    }}>
      11 Jun 2024
    </Typography>
  )
}
const IconAndText = ({ icon, text }) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
    }}>
      {icon}
      <Typography variant="body1" sx={{
        fontSize: '12px', color: 'inherit',
        display: 'inline',
      }}>
        {text}
      </Typography>
    </Box>
  )
}

export function NewsCard({ cardSx, cardButton, cardMediaProps, image, title, subtitle, date, content, isHtml }) {
  const theme = useTheme();
  return (
    <Card elevation={4} sx={cardSx}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          {...cardMediaProps}
          alt="green iguana" sx={{ fontFamily: theme.fontFamily.inter }}
        />
        <CardContent sx={{ padding: 1 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            color: '#9E9E9E'
          }}>
            <Box sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}>
              <IconAndText icon={<CalendarMonthIcon sx={{ height: 17 }} />} text={subtitle || date} />
              {/* <IconAndText icon={<ArrowForwardIcon sx={{ height: 17 }} />} text="3 mins read" /> */}
            </Box>
          </Box>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', }}>
            {title}
          </Typography>
          {
            isHtml ?
              <Box dangerouslySetInnerHTML={{ __html: content }} sx={{ color: 'text.primary', fontSize: '15px' }} />
              : <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 400 }}>
                {content}
              </Typography>
          }

        </CardContent>
      </CardActionArea>

      <CardActions sx={{
        py: '0',
      }}>
        {cardButton}

      </CardActions>
    </Card>
  );
}

export const NewsStackItem = ({ code, title, imageUrl, createdAt, isHtml, content }) => {
  const theme = useTheme();
  const sanitizedHtml = DOMPurify.sanitize(content);
  const router = useRouter();

  return (
    <Card sx={{ display: 'flex', mb: 4 }}>
      <CardActionArea disableRipple sx={{
        cursor: 'default'
      }}>
        <CardActionArea onDoubleClick={()=>{
          router.push(`/blog/${code}`)
        }} >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardMedia
              component="img"
              sx={{ width: '30%' }}
              image={imageUrl}
              alt="Live from space album cover" />
            <CardContent sx={{ display: "inline" }}>
              <Typography component="div" variant="h5" sx={{
                fontWeight: 'bold',
              }}>
                {title}
              </Typography>
              {isHtml ? (
                <Box
                  gutterBottom
                  sx={{ fontSize: 14, color: '#717171', marginBottom: 2 }}
                  dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
              ) : (
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  fontSize={14}
                  color="#717171"
                >
                  {content}
                </Typography>
              )}
              <IconAndText icon={<CalendarMonthIcon sx={{ height: 17 }} />} text={fromIsoToSimpleDate(createdAt)} />
            </CardContent>
          </Box>
        </CardActionArea>
      </CardActionArea>
    </Card>
  );
}

export const NewsImageOnly = ({ cardSx, cardButton, cardMediaProps, cardImage, time }) => {
  return (
    <Card elevation={5} sx={{
      display: 'flex',
      width: '80%',
      mb: 4,
      borderRadius: '10px',
    }}>
      <CardActionArea
        sx={{
          position: 'relative', // Establish a positioning context for child elements
          width: '100%',
        }}
      >
        <CardMedia
          component="img"
          image="blog/blog1.png"
          alt="Live from space album cover"
        />
        <Typography
          sx={{
            width: "100%",
            height: '30%',
            color: theme.palette.text.secondary,
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Adjust transparency
            backdropFilter: "blur(10px)", // Apply blur effect
            borderRadius: "5px", // Optional: Rounded corners
            px: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            fontFamily: 'inter',
            fontSize: 19,
            textAlign: "center",
            zIndex: 10, // Stays on top of the image
            position: 'absolute', // Detach from the flow and position over the image
            bottom: 0, // Align to the bottom of the parent
            left: 0,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Optional: Add a shadow
          }}
        >
          Some post
        </Typography>
      </CardActionArea>
    </Card>

  )
}