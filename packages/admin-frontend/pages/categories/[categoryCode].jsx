import { useBrandCategoryForm } from '@components/forms/AddBrandCategoryForm';
import CategoryFormUI from '@components/forms/ui/CategoryFormUI';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import { FormThumbnailPicker } from '@shared-src/InputAssets'
import React from 'react'

export default function CategoryUpdate() {
    return (
        <CategoryFormUI isUpdate={true} />
    )
}
