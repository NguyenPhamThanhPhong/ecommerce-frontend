import { Checkbox, RadioGroup, FormControlLabel, Radio,
    Divider,
    Typography, Box, Avatar, IconButton, Badge, Stack, Button } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { noFallbackAvatarUtil } from '@styles/styleUtils';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

export function ProductRating({ fontSize, iconSize }) {
    fontSize = fontSize || 11;
    iconSize = iconSize || 22;
    return (
        <Button
            startIcon={<Avatar src='/rating-star.svg' sx={{
                justifyContent: 'center', alignItems: 'center', display: 'flex',
                height: iconSize, width: iconSize, objectFit: 'cover', marginRight: -1, marginLeft: -1,
            }} />}
            sx={{
                backgroundColor: '#FFDCB5',
                padding: '0em 0.5em',
                borderRadius: '42px',
                color: '#FFF',
            }}>
            <Typography variant="body1" sx={{
                marginRight: -0.5,
                fontSize: fontSize, color: '#D48D3B', fontWeight: 'bold',
            }}>4.8</Typography>
        </Button>
    );
}

export function ProductFavorite({ params }) {
    return (
        <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }}
            icon={<FavoriteBorderIcon sx={{ color: '#FF5252' }} />}
            checkedIcon={<Favorite sx={{ color: '#FF5252' }} />}
            sx={{
                zIndex: 1,
                position: 'absolute',
                display: 'inline',
                top: 10, right: 0
            }}>

        </Checkbox>
    )
}

export function ProductSelector({ itemSize, itemGap, iconSize }) {
    const [index, setIndex] = useState(0);
    const items = [
        "/iphone-black.jpg",
        "/iphone-black.jpg",
        "/iphone-black.jpg",
        "/iphone-black.jpg",
        "/iphone-black.jpg",
        "/iphone-black.jpg"

    ];

    const handleNext = () => {
        if (index < items.length - 3) {
            setIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex((prevIndex) => prevIndex - 1);
        }
    };
    itemSize = itemSize || 48;
    itemGap = itemGap || 8;
    iconSize = iconSize || 24;
    return (
        <Box display="flex" justifyContent="center" alignItems="center" gap={1} sx={{
            marginLeft: '26px',
            marginRight: '26px',
            marginBottom: '16px',
        }}>
            <IconButton onClick={handlePrev} disabled={index === 0}><ChevronLeftIcon sx={{
                fontSize: `${iconSize}px`,
                fontWeight: 'bold',
                color: '#000',
            }} /></IconButton>
            <Box sx={{ overflow: 'hidden', width: `calc(${itemSize}px * 3 + 2 * ${itemGap}px)`, position: 'relative' }}>
                <Box
                    sx={{
                        display: 'flex',
                        transition: 'transform 0.5s ease',
                        transform: `translateX(-${index * (itemSize + itemGap)}px)`,
                        width: `${items.length * (itemSize + itemGap)}px`
                    }}>
                    {items.map((src, i) => (
                        <Avatar key={i} variant="rounded" src={src} sx={{
                            width: itemSize, height: itemSize, flexShrink: 0,
                            marginRight: i < items.length - 1 ? `${itemGap}px` : '0'
                        }} />
                    ))}
                </Box>
            </Box>
            <IconButton onClick={handleNext} disabled={index >= items.length - 3}><ChevronRightIcon sx={{
                fontSize: `${iconSize}px`,
                fontWeight: 'bold',
                color: '#000',
            }} /></IconButton>
        </Box>
    )
}

export function ProductColorPickerItem({ color, isSelected, onSelect, itemSize }) {

    return (
        <Radio
            checked={isSelected}
            onChange={() => onSelect(color)}
            icon={
                <Avatar
                    sx={{
                        cursor: 'pointer',
                        bgcolor: color,
                        width: itemSize,
                        height: itemSize,
                        border: `2px solid ${'transparent'}`, // Highlight selected color
                        ...noFallbackAvatarUtil
                    }}
                />
            }
            checkedIcon={
                <Avatar
                    sx={{
                        cursor: 'pointer',
                        bgcolor: color,
                        width: itemSize,
                        height: itemSize,
                        border: `2px solid ${'transparent'}`,
                    }}>
                    <CheckCircleIcon sx={{ fontSize: itemSize - 6, color: '#fff' }} />
                </Avatar>
            }
            sx={{
                padding: 0,
                '& .MuiRadio-root': {
                    display: 'none',
                },
            }}
        />
    );
}

export function ProductColorPicker({ onSelectChange, colorOptions, itemSize }) {
    colorOptions = colorOptions || ['#1E88E5', '#FF5252', '#424242', '#8BC34A'];
    onSelectChange = onSelectChange || ((value) => { });
    const onSelect = (color) => setSelectedColor(color);
    const [selectedColor, setSelectedColor] = React.useState(colorOptions[0]);
    itemSize = itemSize || 24;
    return (
        <RadioGroup row spacing={1} sx={{
            alignItems: 'center', justifyContent: "space-between",
            mb: 1, width: '100%'
        }} value={selectedColor} onChange={() => onSelectChange(null)} >
            {colorOptions.map((color, index) => (
                <FormControlLabel
                    key={index}
                    value={color}
                    control={
                        <ProductColorPickerItem
                            color={color}
                            isSelected={selectedColor === color}
                            onSelect={onSelect}
                            itemSize={itemSize}
                        />
                    }
                    label=""
                    sx={{ margin: 0 }}
                />
            ))}
        </RadioGroup>
    )
}

export function ProductTag({ anchorOrigin, zIndex, fontSize, backgroundColor, color }) {
    const anchor = anchorOrigin || { top: 19, left: 0, }
    zIndex = zIndex || 1;
    fontSize = fontSize || 10;
    backgroundColor = backgroundColor || '#1C6A00';
    color = color || '#fff';

    return (
        <Typography
            variant="body2"
            sx={{
                fontWeight: 'bold',
                ...anchor,
                zIndex: zIndex,
                display: 'inline',
                position: 'relative',
                color: color,
                background: backgroundColor,
                fontSize: fontSize,
                padding: '2px 4px',
            }}
        >
            50% OFF
        </Typography>
    )
}

export const DetailDivider = () => (
    <Divider sx={{ marginTop: '20px', marginBottom: '10px', borderColor: '#bdbcbc' }} />
)





