import {
	Box, Typography,
	FormControl, InputLabel, Select,
	MenuItem, Checkbox, FormGroup, FormControlLabel,
	Slider, Divider, Avatar, Stack, Card,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { noFallbackAvatarUtil } from '@styles/styleUtils';

import { useTheme } from '@mui/material/styles';
import { FilterLabel, FilterPrice, FilterSelect } from '@components/product/FilterUIAssets';
import { useGlobalBrandCategoryContext } from '@shared-conntext/BrandCategoryContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

export default function ProductFilterSidebar({ onPriceFromChange, onPriceToChange,
	onCategoryChange, onBrandChange, onRatingChange, onDiscountChange }) {
	const theme = useTheme();
	const colors =
		['#000000', '#FFFFFF', '#CD6F00', '#BF0000', '#00A99F',
			'#EDD500', '#03AE00', '#0012B8', '#AA00AD', '#E40060',];
	const pub = useSnackbarStore(state => state.pub);
	const { brands, categories, loadBrands, loadCategories } = useGlobalBrandCategoryContext();
	let brandsOptions = [{ id: '', name: 'None' }];
	if (brands?.length > 0) brandsOptions = [...brandsOptions, ...brands.map(brand => ({ id: brand.id, name: brand.name }))];
	let categoriesOptions = [{ id: '', name: 'None' }];
	if (categories?.length > 0) categoriesOptions = [...categoriesOptions, ...categories.map(category => ({ id: category.id, name: category.name }))];

	const checkBoxStyle = {
		color: '#000', // Outline color when not checked
		'&.Mui-checked': {
			color: '#000', // Fill color when checked
		},
	}
	useEffect(() => {
		loadBrands(pub);
		loadCategories(pub);
	}, []);

	return (
		<Card sx={{ width: 281, maxHeight: '1000px', p: 2, borderRadius: 2, boxShadow: 5 }}>
			<Typography variant="h6" gutterBottom>Filter By</Typography>
			<FilterLabel>Category</FilterLabel>
			<FormControl fullWidth size="small">
				<FilterSelect defaultOptionId={''} options={categoriesOptions} onOptionChange={onCategoryChange} />
			</FormControl>
			<FilterLabel>Brand</FilterLabel>
			<FormControl fullWidth size="small">
				<FilterSelect defaultOptionId={''} options={brandsOptions} onOptionChange={onBrandChange} />
			</FormControl>
			<FilterLabel>Price</FilterLabel>
			<FilterPrice onFromChange={onPriceFromChange} onToChange={onPriceToChange} />
			<FilterLabel>Rating</FilterLabel>
			<FormGroup onChange={onRatingChange}>
				<FormControlLabel value={5} control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="5★ & Above" />
				<FormControlLabel value={4} control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="4★ & Above" />
				<FormControlLabel value={3} control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="3★ & Above" />
			</FormGroup>

			<FilterLabel>Discount</FilterLabel>
			<FormGroup onChange={onDiscountChange}>
				<FormControlLabel value={40} control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="40% or More" />
				<FormControlLabel value={30} control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="30% or More" />
				<FormControlLabel value={20} control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="20% or More" />
				<FormControlLabel value={10} control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="10% or More" />
			</FormGroup>

			<FilterLabel>Color</FilterLabel>
			<Box gap={1} mt={1} width={'70%'}
				sx={{ display: 'flex', flexWrap: 'wrap' }}>
				{
					colors.map((color, index) => (
						<Avatar
							key={index}
							sx={{
								width: 24,
								height: 24,
								backgroundColor: color,
								border: '2px solid #000',
								cursor: 'pointer',
								...noFallbackAvatarUtil,
								'&:hover': {
									backgroundColor: color,
									opacity: 0.8
								}
							}}
						/>))
				}

				{/* Add more colors as needed */}
			</Box>
		</Card>
	)
}