import {
    NewsStackItem,
    NewsCard, NewsImageOnly
} from "@components/cards/NewsCard";
import { useNewsBlog } from "@components/cards/NewsUsecase"
import {
    Box, Pagination, Paper, Stack,
    useTheme

} from "@mui/material"
import { searchBlogPosts } from "@shared-api/BlogPosts";
import { useSnackbarStore } from "@shared-conntext/SnackbarContext";
import { useState } from "react";


export default function Blog() {
    const theme = useTheme();
    const pub = useSnackbarStore(state => state.pub);
    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    React.useEffect(() => {
        searchBlogPosts({ page: 0, size: 3, }, [], pub).then((data) => {
            if (data?.data?.length > 0) {
                setBlogs(data.data);
                setTotalPages(data.totalPages);
            }
        });
    }, []);
    function handlePageChange(event, page) {
        setPage(page);
        searchBlogPosts({ page: page - 1, size: 3, sort: 'title,asc' }, [], pub).then((res) => {
            if (res) {
                searchBlogPosts(res.data);
                setTotalPages(res.totalPages);
            }
        });
    }

    return (
        <Box sx={{
            mt: 1,
        }}>
            <Stack width={'100%'}>
                {console.log(blogs)}
                {
                    
                    blogs?.length > 0 && blogs.map((blog, index) => {
                        return (<NewsStackItem key={index} 
                            code={blog.code}
                            title={blog.title} imageUrl={blog.imageUrl}
                            createdAt={blog.createdAt} isHtml={blog.isHtml} content={blog.content} />)
                    })
                }

            </Stack>
            <Paper>
                <Pagination count={totalPages} variant="outlined" shape="rounded"
                    size='medium' siblingCount={1} boundaryCount={1}
                    page={page}
                    onChange={handlePageChange}
                    sx={{
                        mt: 2,
                        mb: 1,
                        justifyContent: 'flex-end',
                        '& .MuiPagination-ul': {
                            justifyContent: 'flex-end',
                        },
                        // minWidth:'300px',
                        '& .MuiPaginationItem-root': {
                            backgroundColor: '#E9E9E9',
                            borderRadius: '8px',
                            fontSize: 15,
                            '&:hover': {
                                backgroundColor: '#000000',
                                color: '#FFFFFF',
                            },
                        },
                        '& .Mui-selected': {
                            fontWeight: theme.fontWeight.semiBold,
                            backgroundColor: '#000000',
                            color: '#FFFFFF',
                        }
                    }}
                />
            </Paper>
        </Box>
    )
}