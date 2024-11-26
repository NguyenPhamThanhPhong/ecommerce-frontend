import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function NewsCard() {
  const theme = useTheme();
  return (
    <Card sx={{ maxWidth: 270, paddingBottom:'10px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="news-1.png"
          alt="green iguana"
        />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="body1" component="div" sx={{
          fontSize:'12px',
        }}>
          11 Jun 2024
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{
          fontWeight:'bold',
        }}>
          Lizard
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{
        py:'0',
      }}>
        <Button size="small" color="primary" variant='contained' endIcon={<ArrowForwardIcon/>} sx={{
          backgroundColor: theme.palette.primary.main,
          fontWeight: theme.fontWeight.light,
          fontSize: '12px',
          ml: '5px',
          borderRadius: '20px',
        }}>
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
