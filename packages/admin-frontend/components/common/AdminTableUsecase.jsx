export function createOrder(id, product, date, customer, total, paymentDate, status) {
    return { id, product, date, customer, total, paymentDate, status };
}

export function useOrdersTable({ rows }) {
    const rowUI = rows.map(
        (row, index) => {
            return (
                <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    aria-checked={isItemSelected}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}>

                </TableRow>
            )
        }
    );
}