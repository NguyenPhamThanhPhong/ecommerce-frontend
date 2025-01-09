import {
    Grid2,

} from '@mui/material';
import ProductCard from '@components/cards/ProductCard'; // Import your existing ProductCard component


export default function ProductGrid({ children, size,gap,index  }) {
    // margin = margin || 0;
    // columnSpacing = columnSpacing || 2;
    // rowSpacing = rowSpacing || 1;
    return (
        <Grid2 container
            // columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 4, xl: 8 }}
            // rowSpacing={{ xs: 2, sm: 2, md: 2, lg: 3, xl: 8 }}
            // columnSpacing={columnSpacing}
            // rowSpacing={rowSpacing}
            sx={{
                justifyContent: 'space-around',
                transition: 'transform 0.5s ease',
                transform: `translateX(-${index * (size + gap)}px)`,
            }}>
            {children}
        </Grid2>
    )
}