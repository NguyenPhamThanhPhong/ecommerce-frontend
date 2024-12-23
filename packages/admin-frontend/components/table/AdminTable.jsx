import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useTable, useResizeColumns, useFlexLayout } from 'react-table';

import {
  Button,
  Chip,
  Checkbox,
  Table, TableBody, TableCell, TableContainer,
  TablePagination,
  TableRow

} from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import EnhancedTableToolbar from '@components/table/TableToolbar';
import EnhancedTableHead from '@components/table/TableHead';
import { RowCheckbox } from '@components/table/TableCheckboxes';
import { ProfileAssets } from '@components/table/UIAssets';
import { ProcessChip, ShippedChip, SuccessChip } from '@shared-src/StatusChips';
import { v4 } from 'uuid';
import { useCommon } from './TableUsecase';

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id: id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}




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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



export default function AdminTable({ columns,data }) {
  const {
    order,orderBy,selected,page,dense,rowsPerPage,dataRows,columnWidths,
    setDataRows,
    handleResizeStart,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeDense,
  } = useCommon({
    data,
    columns, columnWidths: {
      name: 200,    
      calories: 150,
      fat: 100,     
      carbs: 180,   
      protein: 150, 
      none: 15,
    }
  },);
  const visibleRows = React.useMemo(
    () =>
      [...dataRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  const theme = useTheme();
  return (
    <Box>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table size={dense ? 'small' : 'medium'}>
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
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    aria-checked={isItemSelected}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }} />
                    </TableCell>
                    <TableCell padding="normal" sx={{
                      fontWeight: theme.fontWeight.semiBold,
                    }}>
                      {row.id}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row">
                      <ProfileAssets.InfoAvatarGroup
                        avatarProp={{
                          variant: 'square',
                          src: "/banner1.png",
                          sx: {
                            borderRadius: '10px',
                            objectFit: 'contain',
                            width: '50px', height: '50px',
                          }
                        }}
                        boxSx={{
                          marginLeft: '10px'
                        }}
                        title="Muhammed Nabeel" subtitle="junior developer" />
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1" color='#667085' fontWeight="bold" >
                        {row.calories}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {/* <SuccessChip label={'Delivered'}/> */}
                      <ProcessChip label="Processing" />
                      {/* <ShippedChip label="Shipped" /> */}
                    </TableCell>
                    <TableCell align="left">
                      23/12/2021
                    </TableCell>
                    <TableCell align="left">
                      <Button sx={{
                        backgroundColor: 'black',
                        width: '70px',
                        fontWeight: theme.fontWeight.medium,
                        color: 'white',
                      }}>View</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
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
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
{/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}