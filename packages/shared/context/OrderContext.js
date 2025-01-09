import { useEffect, useState } from 'react';
import { getSelfOrders } from '../api/Orders';
import { useSnackbarStore } from './SnackbarContext';
import { dateBetween } from '../api/constants/Filters';

export function useOrderSelfContext() {
    const [orders, setOrders] = React.useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalInstances, setTotalInstances] = useState(0);
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const { pub } = useSnackbarStore();

    useEffect(() => {
        setHasPrev(currentPage > 0);
        setHasNext(currentPage < totalPage - 1);
        pub(`Found ${totalPage} pages`, 'info');
    }, [currentPage, totalPage]);

    function consumeResponse(response) {
        if (!response) return;

        setOrders(response.data);
        setTotalPage(response.totalPages);
        setTotalInstances(response.totalInstances);
        console.log('response', response);
    }
    
    const loadFirstPage = async ( size = 5) => {
        const response = await getSelfOrders({ page: 0, size },pub);
        consumeResponse(response);
    }
    const loadPage = async ( size = 5) => {
        const response = await getSelfOrders({ page, size },pub);
        consumeResponse(response);
        setCurrentPage(page);
    }
    const loadNextPage = async ( size = 5) => {
        const response = await getSelfOrders({ page: currentPage + 1, size },pub);
        consumeResponse(response);
        const next = currentPage + 1;
        setCurrentPage(next);
    }
    const loadPrevPage = async ( size = 5) => {
        const response = await getSelfOrders({ page: currentPage - 1, size },pub);
        consumeResponse(response);
        const prev = currentPage - 1;
        setCurrentPage(prev);
    }

    return {
        orders,
        totalPage,
        currentPage,
        totalInstances,
        hasPrev,
        hasNext,
        loadFirstPage,
        loadPage,
        loadNextPage,
        loadPrevPage
    }
  
}