import { NewsStackItem,
    NewsCard,NewsImageOnly } from "@components/cards/NewsCard";
import { useNewsBlog } from "@components/cards/NewsUsecase"
import {
    Box, Stack

} from "@mui/material"


export default function Blog() {
    const blogsInfo = useNewsBlog();
    return (
        <Box sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <Stack width={'60%'}>
                <Box sx={{
                    // backgroundColor: 'aqua',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>
                    <NewsCard {...blogsInfo} />
                    <NewsCard {...blogsInfo} />
                    <NewsCard {...blogsInfo} />
                    <NewsCard {...blogsInfo} />
                </Box>
                <NewsStackItem />
                <NewsStackItem />
                <NewsStackItem />

            </Stack>
            <Stack width={'40%'} display={'flex'} alignItems={'center'} sx={{
                // backgroundColor: 'pink'
            }}>
                <NewsImageOnly />
                <NewsImageOnly />
                <NewsImageOnly />
            </Stack>
        </Box>
    )
}