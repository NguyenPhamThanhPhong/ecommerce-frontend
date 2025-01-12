import { useCallback, useState } from 'react';
import { create } from 'zustand';


export const useTableState = () => {
    const [temp, setTemp] = useState('15');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [columns, setColumns] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dataRows, setDataRows] = useState([]);
    const [tableActualWidth, setTableActualWidth] = useState(0);
    const [columnWidths, setColumnWidthsState] = useState({});

    const setColumnWidths = useCallback((columnId, newWidth) => {
        setColumnWidthsState((current) => ({
            ...current,
            [columnId]: newWidth,
        }));
    }, []);

    const init = useCallback((data, columns, setDataRowsFunc, setColumnsFunc) => {
        setColumnsFunc(columns);
        setDataRowsFunc(data);
        const widths = {};
        for (const column of columns) {
            widths[column.id] = (tableActualWidth - 20) / columns.length;
            if (column.id === 'none') {
                widths[column.id] = 0;
            }
        }
        setColumnWidthsState(widths);
    }, [tableActualWidth]);

    const handleRequestSort = useCallback((property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, [order, orderBy]);

    const handleSelectAllClick = useCallback((event) => {
        if (event.target.checked) {
            const newSelected = dataRows.map((n) => n.id);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    }, [dataRows]);

    const handleClick = useCallback((id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else if (selectedIndex === 0) {
            newSelected = selected.slice(1);
        } else if (selectedIndex === selected.length - 1) {
            newSelected = selected.slice(0, -1);
        } else if (selectedIndex > 0) {
            newSelected = [
                ...selected.slice(0, selectedIndex),
                ...selected.slice(selectedIndex + 1),
            ];
        }
        setSelected(newSelected);
    }, [selected]);

    const handleChangePage = useCallback((newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const handleResizeStart = useCallback((columnId) => (event) => {
        const startX = event.clientX;
        const startWidth = columnWidths[columnId];

        const handleMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const newWidth = Math.max(30, startWidth + deltaX);
            setColumnWidths(columnId, newWidth);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [columnWidths, setColumnWidths]);

    return {
        temp,setTemp,
        order,orderBy,
        setOrder,setOrderBy,
        selected,setSelected,
        setColumns,
        page,setPage,
        dense,setDense,
        rowsPerPage, setRowsPerPage,
        dataRows, setDataRows,
        tableActualWidth, setTableActualWidth,
        columnWidths, setColumnWidths,
        init,
        handleRequestSort,
        handleSelectAllClick,
        handleClick,
        handleChangePage,
        handleChangeRowsPerPage,
        handleResizeStart,
    };
};