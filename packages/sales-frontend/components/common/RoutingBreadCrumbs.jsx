import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/system'
import { checkPath } from '@utils/PathUtils';


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function RoutingBreadcrumbs() {
  const theme = useTheme();
  const pathNameParts = checkPath().split('/');
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{
      fontSize: '16px', paddingLeft: '3px',
      fontWeight: theme.fontWeight.medium,
      color: 'text.primary',
    }}>
      <Link underline="hover" fontSize='inherit' color="inherit" href="/">
        HOME
      </Link>
      {
        pathNameParts.map((part, index) => {
          if (part === '') {
            return null;
          }
          return (
            <Link
              key={index}
              underline="hover"
              fontSize='inherit'
              color="inherit"
              href={`/${pathNameParts.slice(0, index + 1).join('/')}`}
            >
              {part}
            </Link>
          );
        })
      }
      {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
    </Breadcrumbs>
  );
}