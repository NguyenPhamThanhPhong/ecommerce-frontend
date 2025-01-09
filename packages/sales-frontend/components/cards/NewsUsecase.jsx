import { Button, useTheme } from "@mui/material"

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { trimString } from "@shared-utils/ConverterUtils";
import parse from 'html-react-parser';
import { useSnackbarStore } from "@shared-conntext/SnackbarContext";


export function useNewsDefault({ imageUrl: image, code, title, subtitle, content, date, isHtml, pub }) {
    const theme = useTheme();
    async function share() {
        if (window && document) {
            const appUrl = window.location.origin;
            try {
                await navigator.clipboard.writeText(`${appUrl}/blog/${code}`);
                pub('Product link copied', 'success');
            }
            catch (err) {
                console.error('Failed to copy: ', err);
                pub('Failed to copy product link', 'warning');
            }
        }
    }
    return {
        cardSx: { maxWidth: 270, paddingBottom: '10px' },
        cardButton: (
            <Button size="small" onClick={share} color="primary" variant='contained' endIcon={<ArrowForwardIcon />} sx={{
                backgroundColor: theme.palette.primary.main,
                fontWeight: theme.fontWeight.light,
                fontSize: '12px',
                ml: '5px',
                borderRadius: '20px',
            }}>
                Share
            </Button>
        ),
        image: image,
        date: date || new Date().toDateString(),
        subtitle: subtitle,
        title: title,
        content: isHtml ? trimString(content, 40) : content,
        isHtml
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