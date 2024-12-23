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
                <Typography key={TransactionHeadEnum.DESCRIPTION}>{transactionId}</Typography>
            ),
            (
                <Typography key={TransactionHeadEnum.DATE}>{transactionId}</Typography>
            ),
            (
                <Typography key={TransactionHeadEnum.WITHDRAWEL}>{transactionId}</Typography>
            ),
            (
                <Typography key={TransactionHeadEnum.DEPOSIT}>{transactionId}</Typography>
            ),
        ]
    }
}

export const useAdminTable = ({ rowsData, }) => {
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
                <Typography key={TransactionHeadEnum.DESCRIPTION}>{transactionId}</Typography>
            ),
            (
                <Typography key={TransactionHeadEnum.DATE}>{transactionId}</Typography>
            ),
            (
                <Typography key={TransactionHeadEnum.WITHDRAWEL}>{transactionId}</Typography>
            ),
            (
                <Typography key={TransactionHeadEnum.DEPOSIT}>{transactionId}</Typography>
            ),
        ]
    }
}