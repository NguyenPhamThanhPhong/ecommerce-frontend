import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/system'

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function RoutingBreadcrumbs() {
  const theme = useTheme();
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{
      fontSize: '16px', paddingLeft:'3px',
      fontWeight: theme.fontWeight.medium,
      color: 'text.primary',
    }}>
      <Link underline="hover" fontSize='inherit' color="inherit" href="/">
        Home
      </Link>
      <Link
        fontSize='inherit'
        underline="hover"
        color="inherit"
        href="/material-ui/getting-started/installation/"
      >
        Store
      </Link>
      {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
    </Breadcrumbs>
  );
}