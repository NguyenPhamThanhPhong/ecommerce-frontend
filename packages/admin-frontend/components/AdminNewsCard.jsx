import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, useTheme } from '@mui/material';

import CardActionArea from '@mui/material/CardActionArea';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


export function NewsCard({image, title, subtitle, date, content, isHtml }) {
    const theme = useTheme();
    return (
        <Card elevation={4} sx={{
            maxWidth: 352,
            height: '45vh',
            width: '100%',
            mb: 4,
            paddingBottom: '10px'
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="204px"
                    image={image}
                    
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
        </Card>
    );
}