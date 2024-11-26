import {Grid2,

  } from '@mui/material';
  import ProductCard from '@components/product/ProductCard'; // Import your existing ProductCard component


export default function ProductGrid({length,margin,children,columnSpacing,rowSpacing}) {
    margin = margin || 0;
    length = length || 12;
    columnSpacing = columnSpacing || 2;
    rowSpacing = rowSpacing || 1;
    return (
        <Grid2 container
            // columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 4, xl: 8 }}
            // rowSpacing={{ xs: 2, sm: 2, md: 2, lg: 3, xl: 8 }}
            columnSpacing={columnSpacing}
            rowSpacing={rowSpacing}
            sx={{ 
                justifyContent:'space-around',
                margin: margin, }}>
            {Array(length).fill().map((_, index) => (
                <Grid2 xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                    {children}
                </Grid2>
            ))}
        </Grid2>
    )
}