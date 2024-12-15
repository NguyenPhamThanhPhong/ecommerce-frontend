


const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));
export default function DoomContent() {
    return (
        <>
            <Grid size={5} />
            <Grid size={12}>
                <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
                <Skeleton height={14} />
            </Grid>
            <Grid size={4}>
                <Skeleton height={100} />
            </Grid>
            <Grid size={8}>
                <Skeleton height={100} />
            </Grid>

            <Grid size={12}>
                <Skeleton height={150} />
            </Grid>
            <Grid size={12}>
                <Skeleton height={14} />
            </Grid>

            <Grid size={3}>
                <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
                <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
                <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
                <Skeleton height={100} />
            </Grid></>
    )
}