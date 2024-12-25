'use client'
import {
  ToggleButtonGroup, ToggleButton,
  useTheme
} from '@mui/material'


export const AdminButtonGroups = ({ variants }) => {
    const theme = useTheme();
    const [variant, setVariant] = React.useState("All");
    return (
        <ToggleButtonGroup
          value={variant}
          exclusive
          onChange={(e, newVariant) => setVariant(newVariant)}
          sx={{
            bgcolor: 'white',
            fontFamily: theme.fontFamily.publicSans,
            mb: 2,
            // gap: 4,
          }}>
          {
            variants.map((item, index) => (
              <ToggleButton key={item.id} value={item.id} sx={{
                py: '5px',
                backgroundColor: theme.palette.background.paper,
                // color: theme.palette.success.secondary,
                color: 'secondary',
                fontWeight: theme.fontWeight.medium,
                border: 'none',
                '&.Mui-selected': {
                  backgroundColor: '#F5F5F7',
                  color: theme.palette.success.secondary,
                  fontWeight: 'bold',
                  borderRadius: '10px',
                },
                '&:hover': {
                  backgroundColor: '#F5F5F7',
                  borderRadius: '10px',
                  color: theme.palette.success.secondary,
                  fontWeight: 'bold',
                },
              }}>{item.display}</ToggleButton>
            ))
          }
          {/* <ToggleButton value="512GB">512GB ROM & 8GB RAM</ToggleButton> */}
        </ToggleButtonGroup>
    )
}