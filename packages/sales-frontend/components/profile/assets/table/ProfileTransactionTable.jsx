import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getOrder } from '@shared-api/Orders';
import { TableFooter } from '@mui/material';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [fetched, setFetched] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState([]);

  React.useEffect(() => {
    // getOrder(row.code).then((res) => {
    //   if (res) {
    //     setOrderDetails(res.data.orderDetails);
    //   }
    // });

  }, []);
  function handleOpen() {
    if (fetched === false && row.code) {
      getOrder(row.code).then((res) => {
        if (res) {
          setOrderDetails(res?.orderDetails || []);
          setFetched(true);
        }
      });
    }
    setOpen(!open);
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleOpen}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.code}
        </TableCell>
        <TableCell align="right">{row.createdAt}</TableCell>
        <TableCell align="right">{
          row?.payment?.paymentMethod === 'Payment' ? "VNPay" : "Cash"}</TableCell>
        <TableCell align="right">{row.totalValue}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Discount (%)</TableCell>
                    <TableCell align="right">Net Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetails.map((detail) => {
                    const product = detail?.product;
                    return (
                      <TableRow key={product?.name}>

                        <TableCell component="th" scope="row">
                          {product?.name}
                        </TableCell>
                        <TableCell align="right">{product?.price}</TableCell>
                        <TableCell align="right">{product?.quantity}</TableCell>
                        <TableCell align="right">{product?.discountPercent}</TableCell>
                        <TableCell align="right">
                          {Math.round(product?.price - product?.price * (100 - product?.discountPercent) / 100)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     code: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     isDelete: PropTypes.bool,
//     createdAt: PropTypes.string.isRequired,
//     orderDetails: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         quantity: PropTypes.string.isRequired,
//         discountPercent: PropTypes.number.isRequired,
//       }),
//     ).isRequired,
//     payment: PropTypes.string.isRequired,
//     totalValue: PropTypes.number.isRequired,
//     // paid: PropTypes.string.isRequired,
//   }).isRequired,
// };

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable({ orders, footer }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Payment&nbsp;(vnd)</TableCell>
            <TableCell align="right">Total value&nbsp;(vnd)</TableCell>
            <TableCell align="right">Paid&nbsp;(vnd)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.length > 1 && orders.map((row) => (
            <Row key={row.code} row={row} />
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}