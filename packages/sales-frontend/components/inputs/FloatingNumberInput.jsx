'use client'
import { useState } from "react";
import Comments from "@components/Comments";
import {
  Box,
  Typography,
  Button,
  useTheme,

} from "@mui/material";


export default function ({count,setCount}) {

    const handleIncrement = () => setCount(count + 1);
    const handleDecrement = () => setCount(count - 1);
    const theme = useTheme();
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={1}
            px={2}
            gap={2}
            borderRadius="50px"
            bgcolor="#ffffff"
            maxWidth="150px" sx={{
                boxShadow: theme.boxShadow.default,
            }}>
            <Button
                variant="contained"
                onClick={handleDecrement}
                disabled={count === 0}
                disableRipple
                sx={{
                    minWidth: '30px',
                    fontFamily: 'Inter',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'transparent',
                    color: 'black',
                    boxShadow: 'none',
                    fontSize: '28px',
                    '&:hover': {
                        background: 'gray',
                        boxShadow: 'none',
                    },
                }}>
                -
            </Button>
            <Typography variant="h6" component="span">
                {count}
            </Typography>
            <Button
                variant="contained"
                disableRipple
                onClick={handleIncrement}
                sx={{
                    minWidth: '30px',
                    fontFamily: 'Inter',
                    width: '30px',
                    borderRadius: '50%',
                    height: '30px',
                    background: 'transparent',
                    color: 'black',
                    boxShadow: 'none',
                    fontSize: '22px',
                    '&:hover': {
                        background: 'gray',
                        boxShadow: 'none',
                    },
                }}>
                +
            </Button>
        </Box>
    )
}
