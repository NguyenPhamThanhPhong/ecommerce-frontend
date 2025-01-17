import { useEffect, useState } from 'react';
import { searchBlogPosts,  } from '../api/BlogPosts';
import { useSnackbarStore } from './SnackbarContext';


export default function useBlogPostContext() {
    const [blogs, setBlogs] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalInstances, setTotalInstances] = useState(0);
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const { pub } = useSnackbarStore();

    useEffect(() => {
        setHasPrev(currentPage > 0);
        setHasNext(currentPage < totalPage - 1);
    }, [currentPage, totalPage]);

    function consumeResponse(response) {
        if (!response) return;
        setBlogs(response.data);
        setTotalPage(response.totalPages);
        setTotalInstances(response.totalInstances);
        console.log('response', response);
    }

    const loadFirstPage = async ({ size = 5, filters }) => {
        const response = await searchBlogPosts({ page: 0, size }, filters, pub);
        consumeResponse(response);
    }
    const loadNextPage = async ({ size = 5, filters }) => {
        const response = await searchBlogPosts({ page: currentPage + 1, size }, filters, pub);
        consumeResponse(response);
        const next = currentPage + 1;
        setCurrentPage(next);
    }
    const loadPrevPage = async ({ size = 5, filters }) => {
        const response = await searchBlogPosts({ page: currentPage - 1, size }, filters, pub);
        consumeResponse(response);
        const prev = currentPage - 1;
        setCurrentPage(prev);
    }

    return {
        blogs,
        setBlogs,
        hasPrev,
        hasNext,
        totalPage,
        currentPage,
        totalInstances,
        loadFirstPage,
        loadNextPage,
        loadPrevPage,
    }
}

export function useBlogDetailContext(){
    const [blog, setBlog] = useState({});
    const { pub } = useSnackbarStore();

    async function getBlogDetail(id) {
        const response = await getBlogPost(id, pub);
        setBlog(response);
    }

    return {
        blog,
        setBlog,
        getBlogDetail,
    }
}