import {
	Box, Typography,
	FormControl, InputLabel, Select,
	MenuItem, Checkbox, FormGroup, FormControlLabel,
	Slider, Divider, Avatar, Stack, Card,
	TextField,
	InputAdornment,
	ClickAwayListener
} from '@mui/material';
import { useEffect, useState } from 'react';
import { noFallbackAvatarUtil } from '@styles/styleUtils';

import { useTheme } from '@mui/material/styles';
import { FilterLabel, FilterPrice, FilterSelect } from '@components/product/FilterUIAssets';

export default function ProductFilterSidebar() {
	const theme = useTheme();
	const colors = 
	['#000000', '#FFFFFF', '#CD6F00','#BF0000', '#00A99F',
	'#EDD500', '#03AE00', '#0012B8', '#AA00AD', '#E40060',

	]; // Add more colors as needed

	const checkBoxStyle = {
		color: '#000', // Outline color when not checked
		'&.Mui-checked': {
			color: '#000', // Fill color when checked
		},
	}


	return (
		<Card sx={{ width: 281, maxHeight:'1000px', p: 2, borderRadius: 2, boxShadow: 5 }}>
			<Typography variant="h6" gutterBottom>Filter By</Typography>

			<FilterLabel>Category</FilterLabel>
			<FormControl fullWidth size="small">
				<FilterSelect />
			</FormControl>

			<FilterLabel>Availability</FilterLabel>
			<FormGroup>
				<FormControlLabel
					control={<Checkbox sx={{ ...checkBoxStyle }} />}
					label="In Stock (1248)"
				/>
				<FormControlLabel control={<Checkbox sx={{ ...checkBoxStyle }} />} label="Out of Stock (1020)" />
			</FormGroup>

			<FilterLabel>Price</FilterLabel>
			<FilterPrice />


			<FilterLabel>Brand</FilterLabel>
			<FormControl fullWidth size="small" sx={{ mt: 1 }}>
				<FilterSelect />
			</FormControl>

			<FilterLabel>Rating</FilterLabel>
			<FormGroup>
				<FormControlLabel control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="5★ & Above" />
				<FormControlLabel control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="4★ & Above" />
				<FormControlLabel control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="3★ & Above" />
			</FormGroup>

			<FilterLabel>Discount</FilterLabel>
			<FormGroup>
				<FormControlLabel control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="40% or More" />
				<FormControlLabel control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="30% or More" />
				<FormControlLabel control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="20% or More" />
				<FormControlLabel control={<Checkbox sx={{ ...checkBoxStyle, fontWeight: theme.fontWeight.light }} />} label="10% or More" />
			</FormGroup>

			<FilterLabel>Color</FilterLabel>
			<Box gap={1} mt={1} width={'70%'} 
			sx={{display:'flex', flexWrap:'wrap'}}>
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