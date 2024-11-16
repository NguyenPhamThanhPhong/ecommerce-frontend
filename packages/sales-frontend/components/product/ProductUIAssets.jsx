import { Checkbox, RadioGroup,FormControlLabel, Radio, Card, CardMedia, CardContent, Typography, Box, Avatar, IconButton, Badge, Stack, Button } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { noFallbackAvatarUtil } from '@styles/styleUtils';


export function ProductRating({ params }) {
    return (
        <Button
            startIcon={<Avatar src='rating-star.svg' sx={{
                justifyContent: 'center', alignItems: 'center', display: 'flex',
                height: 22, width: 22, objectFit: 'cover', marginRight: -1, marginLeft: -1,
            }} />}
            sx={{
                backgroundColor: '#FFDCB5',
                padding: '0em 0.5em',
                borderRadius: '42px',
                color: '#FFF',
            }}
        >
            <Typography variant="body1" sx={{
                marginRight: -0.5,
                fontSize: 11, color: '#D48D3B', fontWeight: 'bold',
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

export function ProductColorPickerItem({ color, isSelected, onSelect }) {
    return (
        <Radio
            checked={isSelected}
            onChange={() => onSelect(color)}
            icon={
                <Avatar
                    sx={{
                        cursor: 'pointer',
                        bgcolor: color,
                        width: 24,
                        height: 24,
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
                        width: 24,
                        height: 24,
                        border: `2px solid ${'transparent'}`,

                    }}
                >
                    <CheckCircleIcon sx={{ fontSize: 18, color: '#fff' }} />
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

export function ProductColorPicker({ onSelectChange,colorOptions }) {
    colorOptions = colorOptions || ['#1E88E5', '#FF5252', '#424242', '#8BC34A'];
    onSelectChange = onSelectChange || ((value) => { });
    const onSelect = (color) => setSelectedColor(color);
    const [selectedColor, setSelectedColor] = React.useState(colorOptions[0]);
    return (
        <RadioGroup row spacing={1} sx={{
            alignItems: 'center', justifyContent: "space-between",
            mb: 1, width: '100%'
        }} value={selectedColor} onChange={()=>onSelectChange(null)} >
            {colorOptions.map((color, index) => (
                <FormControlLabel
                    key={index}
                    value={color}
                    control={
                        <ProductColorPickerItem
                            color={color}
                            isSelected={selectedColor === color}
                            onSelect={onSelect}
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





