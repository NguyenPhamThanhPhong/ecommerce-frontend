import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { toLocaleString, toLocaleFixedString, toPercentage } from '@shared-utils/ConverterUtils';

const columns = [
  { id: 'id', label: 'ID', minWidth: 80 },
  { id: 'product', label: 'Product', minWidth: 100 },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Gross Price',
    minWidth: 100,
    align: 'right',
    format: (value) => toLocaleString(value),
  },
  {
    id: 'discount',
    label: 'Discount',
    minWidth: 60,
    align: 'right',
    format: (value) => toPercentage(value),
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 100,
    align: 'right',
    format: (value) => toLocaleFixedString(value),
  },
];

function createData(product, id, quantity, price, discount) {
  const total = quantity * price;
  return { product, id, quantity, price, discount, total };
}

const rows = [
  createData('India', 'IN', 12, 1956475, 0.215),
  createData('China', 'CN', 12, 1956475, 0.215),
  createData('Italy', 'IT', 12, 1956475, 0.2),
  createData('United States', 'US', 1, 1956475, 0.2),
  createData('Canada', 'CA', 5, 1956475, 0.2),

];

const calculationRows = [
  {
    price: 'Gross Price',
    total: 15,
  },
  {
    price: 'VAT',
    total: 0.00,
  },
  {
    price: 'Shipping fee',
    total: 20.00,
  },
  {
    price: 'Net Total',
    total: 731.25,
  },
]

export default function ReadOnlyTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {
              calculationRows.map((row) => {
                return (
                  <TableRow hover key={row.price}>
                    <TableCell colSpan={5} key={row.price} align='right' sx={{fontWeight:'bold',fontSize:16}}>
                      {row.price}
                    </TableCell>
                    <TableCell key={row.total} align='right'>
                      {row.total}
                    </TableCell>
                  </TableRow>)
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}