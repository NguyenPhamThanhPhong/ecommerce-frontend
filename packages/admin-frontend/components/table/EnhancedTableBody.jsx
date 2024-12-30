import { CellCheckbox, cellVariants } from "../../../shared/src/TableCellsAssets";
import * as React from 'react';
import { TableBody, 
  TableRow,

} from '@mui/material';


export const EnhancedTableBody = ({visibleRows, handleClick, selected}) => {
    return (
        <TableBody>
            {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id) ;
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        aria-checked={isItemSelected}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}>
                            <CellCheckbox isItemSelected={isItemSelected} labelId={labelId} />
                        {
                            Object.entries(row).map(([key, value]) => {
                                return (
                                    value?.variant && cellVariants[value.variant](value)
                                )
                            })
                        }
                    </TableRow>
                );
            })}
        </TableBody>
    )
}