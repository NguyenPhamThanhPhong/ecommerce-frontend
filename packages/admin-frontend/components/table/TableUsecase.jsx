import { Typography } from "@mui/material"

function createCells(id, name, numeric, label, sort = false) {
    return {
        id: id,
        numeric: numeric,
        disablePadding: false,
        label: label,
        sort: sort
    }
}


export const useTransactionTabel = ({ rowsData, }) => {
    const TransactionHeadEnum = {
        TRANSACTION_ID: '1',
        DESCRIPTION: '2',
        DATE: '3',
        WITHDRAWEL: '4',
        DEPOSIT: '5'
    }

    const headCells = [
        createCells(TransactionHeadEnum.TRANSACTION_ID, false, 'Transaction ID'),
        createCells(TransactionHeadEnum.DESCRIPTION, false, 'Description '),
        createCells(TransactionHeadEnum.DATE, false, 'Date'),
        createCells(TransactionHeadEnum.WITHDRAWEL, false, 'WITHdrawel'),
        createCells(TransactionHeadEnum.DEPOSIT, false, 'Deposit'),
    ]
    const rowFormat = (transactionId, description, date, withdrawel, deposit) => {
        return [(
            <Typography key={TransactionHeadEnum.TRANSACTION_ID} sx={{
                color: 'primary.main'
            }}>{transactionId}</Typography>
        ),
        (
            <Typography key={TransactionHeadEnum.DESCRIPTION}>{description}</Typography>
        ),
        (
            <Typography key={TransactionHeadEnum.DATE}>{date}</Typography>
        ),
        (
            <Typography key={TransactionHeadEnum.WITHDRAWEL}>{withdrawel}</Typography>
        ),
        (
            <Typography key={TransactionHeadEnum.DEPOSIT}>{deposit}</Typography>
        ),
        ]
    }
}

export function useCommon({ data, columns, columnWidths: initialColumnWidths, initialSorted, soratedDefault, }) {
    const [columnWidths, setColumnWidths] = React.useState({
        name: '20%',        // Static width for 'name' column
        calories: '30%',    // Static width for 'calories' column
        fat: '10%',         // Static width for 'fat' column
        carbs: '20%',       // Static width for 'carbs' column
        protein: '10%',     // Static width for 'protein' column
        none: 30,         // Static width for 'none' column
    }
    );


    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [dataRows, setDataRows] = React.useState(data);

    const handleResizeStart = (columnId) => (event) => {

        const startX = event.clientX;
        const startWidth = columnWidths[columnId];
    
        const handleMouseMove = (moveEvent) => {
          const deltaX = moveEvent.clientX - startX;
    
          const newWidth = Math.max(30, startWidth + deltaX); // Ensure a minimum width
    
          setColumnWidths((prevWidths) => {
            const updatedWidths = {
              ...prevWidths,
              [columnId]: newWidth,
            };
            console.log('Updated column widths:', updatedWidths);
            return updatedWidths;
          });
        };
    
        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };
    
      const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
    
      const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelected = dataRows.map((n) => n.id);
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

      return {
        order,
        orderBy,
        dataRows,
        setDataRows,
        selected,
        page,
        dense,
        rowsPerPage,
        columnWidths,
        handleResizeStart,
        handleRequestSort,
        handleSelectAllClick,
        handleClick,
        handleChangePage,
        handleChangeRowsPerPage,
        handleChangeDense,
      };
}