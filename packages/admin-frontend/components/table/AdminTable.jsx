import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {
  Table, TableContainer,
  TablePagination,

} from '@mui/material';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EnhancedTableToolbar from '@components/table/TableToolbar';
import EnhancedTableHead from '@components/table/TableHead';
import { useTableState, useTableStore } from '@data/TableContext';
import { EnhancedTableBody } from './EnhancedTableBody';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}



export default function AdminTable({ columns, data, dataMapper, handleApplyFilters, FilterModal }) {
  const {
    order, orderBy,
    setOrder, setOrderBy,
    selected, setSelected,
    setColumns,
    page, setPage,
    rowsPerPage,
    dataRows, setDataRows, setTableActualWidth,
    columnWidths,
    init,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleResizeStart,
  } = useTableState();
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);

  const visibleRows = React.useMemo(
    () =>
      [...dataRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => dataMapper(row)),
    [dataRows, order, orderBy, page, rowsPerPage],
  );
  const tableRef = React.useRef(null);

  React.useEffect(() => {

    if (tableRef.current) {
      setTableActualWidth(tableRef.current.offsetWidth);
      init(data, columns, setDataRows, setColumns);
    }
  }, []);




  return (
    <Box>
      <Paper>
        {
          FilterModal && <FilterModal open={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}
            onApply={handleApplyFilters} />
        }
        <EnhancedTableToolbar setIsFilterModalOpen={setIsFilterModalOpen} numSelected={selected.length} />
        <TableContainer>
          <Table ref={tableRef} size={'small'}>
            <EnhancedTableHead
              handleResizeStart={handleResizeStart}
              columnWidths={columnWidths}
              columns={columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dataRows.length} />
            <EnhancedTableBody visibleRows={visibleRows} selected={selected} handleClick={handleClick} />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
