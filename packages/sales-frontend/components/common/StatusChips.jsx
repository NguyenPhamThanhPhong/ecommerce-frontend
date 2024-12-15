const { Chip, useTheme } = require("@mui/material")

export const SuccessChip = ({ label }) => {
    const theme = useTheme();
    return (
        <Chip label={label} sx={{
            fontWeight: theme.fontWeight.semiBold,
            bgColor: '#E7F4EE',
            color: '#0d894f',
        }} />
    )
}

export const ProcessChip = ({ label }) => {
    const theme = useTheme();
    return (
        <Chip label={label} sx={{
            fontWeight: theme.fontWeight.semiBold,
            backgroundColor: 'rgba(253, 241, 232,0.9)',
            color: '#e46a11',
        }} />
    )
}


export const ShippedChip = ({ label }) => {
    const theme = useTheme();
    return (
        <Chip label={label} sx={{
            fontWeight: theme.fontWeight.semiBold,
            bgColor: '#e8f8fd',
            color: '#13b2e4',
        }} />
    )
}