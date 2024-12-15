import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';


import {
  Button,
  Chip,
  Table, TableBody, TableCell, TableContainer,
  TablePagination,
  TableRow

} from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import EnhancedTableToolbar from '@components/profile/assets/table/TableToolbar';
import EnhancedTableHead from '@components/profile/assets/table/TableHead';
import { RowCheckbox } from '@components/profile/assets/table/TableCheckboxes';
import { ProfileAssets } from '../ProfileAssets';
import { ProcessChip, ShippedChip, SuccessChip } from '@components/common/StatusChips';

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id: '#302012',
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

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



export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
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
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  const theme = useTheme();
  return (
    <Box sx={{
      width: '100%',

    }}>
      <Paper sx={{
        width: '100%', mb: 2,
      }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              width: '100%',

            }}
            aria-labelledby="tableTitle"
          // size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    // hover
                    // onClick={(event) => handleClick(event, row.id)}
                    aria-checked={isItemSelected}
                    // tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="normal" sx={{
                      fontWeight: theme.fontWeight.semiBold,
                    }}>
                      {row.id}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                    >
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
                      <Typography variant="body1" color='#667085' fontWeight="bold" >
                        12 Dec 2024
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Button sx={{
                        backgroundColor: 'black',
                        width: '70px',
                        fontWeight: theme.fontWeight.medium,
                        color:'white',
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
          count={rows.length}
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