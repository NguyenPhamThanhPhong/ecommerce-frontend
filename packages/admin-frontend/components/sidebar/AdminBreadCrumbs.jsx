import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/system'
import { checkPath } from '@shared-utils/PathUtils';
import { Avatar, Stack, SvgIcon, Typography } from '@mui/material';
import Image from 'next/image';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}
function formatString(input) {
    return input
        .split('-') // Split the string by dashes
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
        .join(' '); // Join words with a space
}

export default function AdminBreadcrumbs() {
    const theme = useTheme();
    const pathNameParts = checkPath().split('/');

    const title = formatString(pathNameParts[pathNameParts.length - 1]);

    return (
        <>
            <Typography variant="h4" sx={{
                paddingLeft: '3px',
                fontWeight: theme.fontWeight.bold,
                color: 'text.primary',
                mb: '10px',
            }}>
                {title || "Dashboard"}
            </Typography>
            <Breadcrumbs direction={'row'} aria-label="breadcrumb"
                separator={<Image src='/breadcrumbs-separator.svg' width={12} height={12} />}
                sx={{
                    mb: '10px',
                    fontSize: '16px', paddingLeft: '3px',
                    fontWeight: theme.fontWeight.bold,
                    color: 'text.primary',
                }}>
                <Link key={'dashboard'} underline="none" fontSize='inherit' color="primary" href="/" fontWeight={'inherit'} >
                    Dashboard
                </Link>
                {
                    pathNameParts.map((part, index) => {
                        if (part === '') {
                            return null;
                        }
                        return (
                            <Link key={index}
                                underline="none" fontSize='inherit' color="primary"
                                href={`/${pathNameParts[index]}`} fontWeight={'inherit'} >
                                {formatString(part)}
                            </Link>
                        );
                    })
                }


                {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
            </Breadcrumbs>

        </>
    );
}