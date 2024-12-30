import { Chip, useTheme } from "@mui/material";



export const SuccessChip = ({ label }) => {
    const theme = useTheme();
    return (
        <Chip label={label || 'Success'} sx={{
            fontWeight: theme.fontWeight.semiBold,
            bgColor: '#E7F4EE',
            color: '#0d894f',
        }} />
    )
}

export const ProcessChip = ({ label }) => {
    const theme = useTheme();
    return (
        <Chip label={label || 'Proccess'} sx={{
            fontWeight: theme.fontWeight.semiBold,
            backgroundColor: 'rgba(253, 241, 232,0.9)',
            color: '#e46a11',
        }} />
    )
}


export const ShippedChip = ({ label }) => {
    const theme = useTheme();
    return (
        <Chip label={label || 'Shipped'} sx={{
            fontWeight: theme.fontWeight.semiBold,
            bgColor: '#e8f8fd',
            color: '#13b2e4',
        }} />
    )
}
export const WarningChip = ({ label }) => {
    const theme = useTheme();
    return (
        <Chip label={label || 'Warning'} sx={{
            fontWeight: theme.fontWeight.semiBold,
            bgColor: '#fdeee7',
            color: '#e46a11',
        }} />
    )
}
export const ErrorChip = ({ label }) => {
    const theme = useTheme();
    return (
        <Chip label={label || 'Error'} sx={{
            fontWeight: theme.fontWeight.semiBold,
            bgColor: 'rgb(205, 14, 14)',
            color: '#fdeee7',
        }} />
    )
}
export const DraftChip = ({ label }) => {
    const theme = useTheme();
    return (
        <Chip label={label || 'Draft'} sx={{
            fontWeight: theme.fontWeight.semiBold,
            bgColor: '#f5f5f5',
            color: '#666666',
        }} />
    )
}
export const ChipVariants = {
    "success": SuccessChip,
    "process": ProcessChip,
    "shipped": ShippedChip,
    "warning": WarningChip,
    "error": ErrorChip,
    "draft": DraftChip,

}