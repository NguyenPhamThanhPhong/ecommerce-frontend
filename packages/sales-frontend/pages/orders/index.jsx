'use client'
import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Chip,
} from "@mui/material";

const orders = [
  {
    id: "#302012",
    product: "Iphone 13",
    total: "52,999/-",
    status: "Delivered",
    date: "12 Dec 2023",
  },
  {
    id: "#302011",
    product: "SAMSUNG Galaxy F13",
    total: "10,999/-",
    status: "Processing",
    date: "1 Dec 2023",
  },
  {
    id: "#302006",
    product: "OPPO Reno 10 Pro",
    total: "39,999/-",
    status: "Shipped",
    date: "10 Nov 2023",
  },
  {
    id: "#302001",
    product: "Realme 11X 5G",
    total: "16,500/-",
    status: "Shipped",
    date: "2 Nov 2023",
  },
];

const ITEMS_PER_PAGE = 5;

const Orders = () => {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Paginate items
  const paginatedOrders = orders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const getStatusChip = (status) => {
    switch (status) {
      case "Delivered":
        return <Chip label="Delivered" color="success" />;
      case "Processing":
        return <Chip label="Processing" color="warning" />;
      case "Shipped":
        return <Chip label="Shipped" color="info" />;
      default:
        return <Chip label={status} />;
    }
  };

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom>
        Orders <Typography component="span">(26 ITEMS)</Typography>
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {order.product}
                  <Typography variant="body2" color="text.secondary">
                    +1 other products
                  </Typography>
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{getStatusChip(order.status)}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(orders.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChange}
        sx={{ marginTop: "16px", display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default Orders;
