import React from 'react';
import {
    Box, Card, CardContent, Typography, CardMedia,
    Button,
    Stack,
    useTheme,
    Paper,
    InputBase,
    IconButton,
    CardActionArea,
    Chip,
    Pagination
} from '@mui/material';
import { Download } from '@mui/icons-material';
import { AdminButtonGroups } from '@components/common/AdminButtonGroups';
import { AddOrderButton } from '@shared-src/ButtonAssets';
import { useEffect, useState } from 'react';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { COMPARISONS, createFilter, JOIN_CONDITIONS, TYPES } from '@shared-api/constants/Filters';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteBlogPost, searchBlogPosts } from '@shared-api/BlogPosts'
import ConfirmCancelModal from '@components/ConfirmCancelModal';
import { fromIsoToSimpleDate } from '@shared-utils/ConverterUtils';


const BLOG_STATUSES = {
    ALL: 'ALL',
    DELETED: 'DELETED',
}
const variants = [
    {
        id: BLOG_STATUSES.ALL,
        display: 'All',
    },
    {
        id: BLOG_STATUSES.DELETED,
        display: 'DELETED',
    },

]

export default function BlogsPage() {
    const router = useRouter();
    const pub = useSnackbarStore(state => state.pub);
    const theme = useTheme();
    const [blogs, setBlogs] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(BLOG_STATUSES.ALL);
    const [open, setOpen] = React.useState(false);
    const [deleteSelected, setDeleteSelected] = React.useState(null);

    React.useEffect(() => {
        searchBlogPosts({ page: 0, size: 12, }, [], pub).then((data) => {
            if (data?.data?.length > 0) {
                setBlogs(data.data);
                setTotalPages(data.totalPages);
                
            }
        });
    }, []);
    function handlePageChange(event, page) {
        setPage(page);
        searchBlogPosts({ page: page - 1, size: size, sort: sort }, [], pub).then((res) => {
            if (res) {
                searchBlogPosts(res.data);
                setTotalPages(res.totalPages);
            }
        });
    }

    function calculateFilterDeletedAt(isNull) {
        return createFilter(JOIN_CONDITIONS.AND, null, 'deletedAt',
            TYPES.milisecs, isNull ? COMPARISONS.IS_NULL : COMPARISONS.IS_NOT_NULL, 0, false);
    }
    function calculateFiltersFromStatus() {
        if (status === BLOG_STATUSES.ALL) {
            return [calculateFilterDeletedAt(true)];
        }
        if (status === BLOG_STATUSES.DELETED) {
            return [calculateFilterDeletedAt(false)];
        }
    }

    function calculateFilters() {
        let filters = [];
        if (search?.length > 0 && search !== '') {
            filters.push(createFilter(JOIN_CONDITIONS.OR, null, 'title',
                TYPES.string, COMPARISONS.LIKE, search, false));
            filters.push(createFilter(JOIN_CONDITIONS.OR, 'author', 'fullName',
                TYPES.string, COMPARISONS.LIKE, search, false));
        }
        filters = [...filters, ...calculateFiltersFromStatus()];
        return filters;
    }
    function submit() {
        const filters = calculateFilters();
        searchBlogPosts({ page: 0, size: 40, }, filters, pub).then((data) => {
            if (data?.data) {
                console.log('data', data);
                setBlogs(data.data);
            }
        });
    }
    function deleteRow(id) {
        if (id) {
            deleteBlogPost(id, pub).then((data) => {
                if (data) {
                    pub('Deleted successfully', 'success');
                    setBlogs(blogs.filter((blog) => blog.id !== id));
                }
            });
        }
        setOpen(false);
    }


    return (
        <Box>
            <ConfirmCancelModal open={open} onCancel={() => setOpen(false)}
                onConfirm={() => deleteRow(deleteSelected)} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
            }}>
                <Paper
                    component="form"
                    sx={{ display: 'flex', alignItems: 'center', width: 400 }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Find something..."
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton onClick={submit} type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <AdminButtonGroups variant={status} onChange={(e) => setStatus(e.target.value)} variants={variants} />
                <Stack direction='row' gap={3} sx={{
                }}>
                    <Button startIcon={<Download />} onClick={() => router.push("/blogs/add-blog")} sx={{
                        backgroundColor: '#f4ecfb', height: 40,
                        fontWeight: theme.fontWeight.semiBold,
                        px: 2,
                    }}>
                        Export
                    </Button>
                    <AddOrderButton onClick={()=>router.push('blogs/add-blog')} label={'Add New Blog'} />
                </Stack>
            </Box>
            <Box spacing={2} sx={{
                display: 'flex',
                gap: 7,
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'center', position: 'relative'
            }}>

                {blogs.map((blog, index) => (
                    <Card key={index} sx={{ position: 'relative', minWidth:'200px' }}>
                        <IconButton onClick={() => {
                            setOpen(true);
                            setDeleteSelected(blog.id);
                        }} sx={{
                            position: 'absolute',
                            zIndex: 1,
                            right: 0,
                            top: 0,
                        }}>
                            <DeleteIcon />
                        </IconButton>
                        <Chip
                            label={`Edit ${blog.code}`}
                            onClick={() => router.push(`/blogs/${blog?.code}`)}
                            icon={<EditIcon />}
                        />
                        <CardActionArea onDoubleClick={() => router.push(`/blogs/${blog?.code}`)} >
                            <CardMedia
                                component="img"
                                height="140"
                                image={blog.image}
                                alt={blog.title}
                            />
                            <CardContent>
                                <Typography variant="caption" color="textSecondary">
                                    {`Created at: ${fromIsoToSimpleDate(blog.createdAt)}`}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    {blog.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {blog.subtitle}
                                </Typography>
                                {blog.isHTML ? (
                                    <Box
                                        dangerouslySetInnerHTML={{ __html: blog.content }}
                                        sx={{ mt: 1 }}
                                    />
                                ) : (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {blog.content}
                                    </Typography>
                                )}
                                <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                                    {`Author: ${blog.author.fullName}`}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
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
