import { create } from 'zustand';

const columns = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'OrderId',
        width: 150,
        resizable: true,
    },
    {
        id: 'calories',
        numeric: false,
        disablePadding: false,
        label: 'Product',
        width: 150,
        resizable: true,

    },
    {
        id: 'fat',
        numeric: false,
        disablePadding: false,
        label: 'Total',
        width: 150,
        resizable: true,

    },
    {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Status',
        width: 150,
        resizable: true,

    },
    {
        id: 'protein',
        numeric: false,
        disablePadding: false,
        label: 'asdasd',
        width: 150,
        resizable: true,

    },
    {
        id: 'none',
        numeric: false,
        disablePadding: false,
        label: '',
        width: 10,
    },
];

export const useTableStore = create((set, get) => ({
    temp: '15',
    setTemp: (temp) => set({ temp: temp }),
    order: 'asc',
    orderBy: 'id',
    selected: [],
    columns: [],
    page: 0,
    dense: false,
    rowsPerPage: 5,
    dataRows: [],
    tableActualWidth: 0,
    columnWidths: {},
    init: (data, columns, setDataRows, setColumns) => {
        setColumns(columns)
        console.log('columns ', columns)
        setDataRows(data)
        const widths = {}
        for (const column of columns) {
            widths[column.id] = (get().tableActualWidth - 20) / columns.length;
            if (column.id === 'none') {
                widths[column.id] = 0;
            }
        }

        set({ columnWidths: widths });
    },
    setColumns: (columns) => set({ columns: columns }),
    setDataRows: (dataRows) => set({ dataRows: dataRows }),
    setSelected: (selected) => set({ selected: selected }),
    setOrder: (order) => set({ order: order }),
    setOrderBy: (orderBy) => set({ orderBy: orderBy }),
    setPage: (page) => set({ page: page }),
    setDense: (dense) => set({ dense: dense }),
    setTableActualWidth: (width) => set({ tableActualWidth: width }),
    setColumnWidths: (columnId, newWidth) => {
        const currentWidths = get().columnWidths;
        set({
            columnWidths: {
                ...currentWidths,
                [columnId]: newWidth,
            },
        });
    },
    handleResizeStart: (columnId) => (event) => {
        const startX = event.clientX;
        const startWidth = get().columnWidths[columnId];

        const handleMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const newWidth = Math.max(30, startWidth + deltaX); // Ensure a minimum width

            get().setColumnWidths(columnId, newWidth);
        };
        // when mouse down add a mouse move & mouse up
        // mouse up help clear the mouse move event
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

    },
    handleRequestSort: (event, property) => {
        const isAsc = get().orderBy === property && get().order === 'asc';
        get().setOrder(isAsc ? 'desc' : 'asc');
        get().setOrderBy(property);
    },
    handleSelectAllClick: (event) => {
        if (event.target.checked) {
            const newSelected = get().dataRows.map((n) => n.id);
            get().setSelected(newSelected);
            return;
        }
        get().setSelected([]);
    },
    handleClick: (event, id) => {
        const selected = get().selected;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        get().setSelected(newSelected);
    },
    handleChangePage: (event, newPage) => {
        get().setPage(newPage);
    },
    handleChangeRowsPerPage: (event) => {
        get().setRowsPerPage(parseInt(event.target.value, 10));
        get().setPage(0);
    },
    handleChangeDense: (event) => set({ dense: event.target.checked }),
}));