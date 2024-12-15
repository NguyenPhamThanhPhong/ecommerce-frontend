import { Button, useTheme } from "@mui/material"

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export function useNewsDefault() {
    const theme = useTheme();
    return {
        cardSx: { maxWidth: 270, paddingBottom: '10px' },
        cardButton: (
            <Button size="small" color="primary" variant='contained' endIcon={<ArrowForwardIcon />} sx={{
                backgroundColor: theme.palette.primary.main,
                fontWeight: theme.fontWeight.light,
                fontSize: '12px',
                ml: '5px',
                borderRadius: '20px',
            }}>
                Share
            </Button>
        ),
        cardImage: 'news-1.png',
        date: '11 Jun 2024',
        title: 'Lizard',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        image: 'news-1.png',
    }
}

export function useNewsBlog() {
    const theme = useTheme();
    return {
        cardSx: {
            maxWidth: 352,
            height: '45vh',
            width: '100%',
            mb: 4,
            paddingBottom: '10px'
        },
        cardMediaProps: {
            height: '204px'
        },

        date: '11 Jun 2024',
        title: 'Lizard',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        image: 'news-1.png',
    }
}