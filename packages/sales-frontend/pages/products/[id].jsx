'use client'
import { useState } from "react";
import Comments from "@components/Comments";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid2,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClockIcon from "@mui/icons-material/AccessTime"; // Replace if using a different icon package

const ProductPage = () => {
  const [color, setColor] = useState("purple");
  const [variant, setVariant] = useState("256GB");
  const [quantity, setQuantity] = useState(1);

  const colors = {
    purple: "#5A4FCF",
    green: "#98D89A",
    yellow: "#EFC16F",
    pink: "#F4A7C1",
  };

  return (
    <>
    <Box p={3} maxWidth="1200px" mx="auto" fontFamily="'Roboto', sans-serif">
      {/* Breadcrumb */}
      <Typography variant="body2" mb={2}>
        HOME / STORE / PRODUCT
      </Typography>

      {/* Title and Wishlist */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          I Phone 15 pro
        </Typography>
        <Box>
          <IconButton>
            <ClockIcon />
          </IconButton>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Price and Rating */}
      <Box display="flex" alignItems="center" mt={1} mb={2}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          ₹15000
        </Typography>
        <Typography
          variant="body2"
          sx={{ textDecoration: "line-through", ml: 2, color: "gray" }}
        >
          ₹51000
        </Typography>
        <Box ml={3}>
          <Typography variant="body2">
            <span style={{ fontWeight: "bold", color: "#FFD700" }}>4.8</span>{" "}
            <span style={{ color: "gray" }}>(67 Reviews)</span>
          </Typography>
        </Box>
      </Box>

      {/* Color Picker */}
      <Typography variant="body2" fontWeight="bold" mb={1}>
        Choose a color
      </Typography>
      <Box display="flex" gap={2} mb={3}>
        {Object.entries(colors).map(([name, hex]) => (
          <Button
            key={name}
            sx={{
              width: 30,
              height: 30,
              backgroundColor: hex,
              borderRadius: "50%",
              border: color === name ? "2px solid black" : "2px solid transparent",
            }}
            onClick={() => setColor(name)}
          />
        ))}
      </Box>

      {/* Variant Picker */}
      <Typography variant="body2" fontWeight="bold" mb={1}>
        Choose a variant
      </Typography>
      <ToggleButtonGroup
        value={variant}
        exclusive
        onChange={(e, newVariant) => setVariant(newVariant)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="256GB">256GB ROM & 8GB RAM</ToggleButton>
        <ToggleButton value="512GB">512GB ROM & 8GB RAM</ToggleButton>
      </ToggleButtonGroup>

      {/* Quantity Selector */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button
          variant="outlined"
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
        >
          -
        </Button>
        <Typography variant="body1">{quantity}</Typography>
        <Button
          variant="outlined"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </Button>
      </Box>

      {/* Add to Cart */}
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "100%", py: 2, mb: 4 }}
      >
        Add to Cart
      </Button>

      {/* Highlights Section */}
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <Typography variant="body2" fontWeight="bold">
            Highlights
          </Typography>
          <ul>
            <li>128 GB ROM</li>
            <li>15.49 Cm (6.1 Inch) Super Retina XDR Display</li>
            <li>12MP + 12MP | 12MP Front Camera</li>
            <li>A15 Bionic Chip, 6 Core Processor</li>
          </ul>
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <Typography variant="body2" fontWeight="bold">
            Payment Options
          </Typography>
          <ul>
            <li>Cash On Delivery</li>
            <li>Net Banking & Credit/Debit/ATM Card</li>
          </ul>
        </Grid2>
      </Grid2>
    </Box>
    <Comments />
    </>
  );
};

export default ProductPage;
