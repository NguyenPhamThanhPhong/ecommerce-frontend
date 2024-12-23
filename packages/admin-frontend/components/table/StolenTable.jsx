import React, { createRef, useRef, useEffect } from "react";
// import "./StolenTable.css";
import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Paper
} from "@mui/material";

const logg = console.log;

const rows = [
  { id: 1, lastName: "Nguyen", firstName: "Truong", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "firstName",
    headerName: "First name",
    width: 130,
    minWidth: 100,
    maxWidth: 300
  },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column haasdasdasds a value getter and is not sortable.",
    sortable: false,
    width: "50%",
    formatValue: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`
  }
];

const DEFAULT_MIN_WIDTH_CELL = 70;
const DEFAULT_MAX_WIDTH_CELL = 800;

export default function StolenTable() {
  const columnRefs = columns.map(() => createRef());
  const isResizing = useRef(-1);

  // need to implement load when open again

  useEffect(() => {
    // loadColumnInfoLocalStorage();
    document.onmousemove = handleOnMouseMove;
    document.onmouseup = handleOnMouseUp;
    return () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }, []);

  function loadColumnInfoLocalStorage() {
    let columnsInfo = localStorage.getItem("columnsInfo");
    if (columnsInfo) {
      columnsInfo = JSON.parse(columnsInfo);
      Object.keys(columnsInfo).forEach((colField, index) => {
        columnRefs[index].current.parentElement.style.width =
          columnsInfo[colField];
      });
    }
  }

  const saveColumnInfoLocalStorage = () => {
    let columnsInfo = {};
    columns.forEach((col, index) => {
      columnsInfo[col.field] = {};
      columnsInfo[col.field] =
        columnRefs[index].current.parentElement.style.width;
    });
    localStorage.setItem("columnsInfo", JSON.stringify(columnsInfo));
  };

  const adjustWidthColumn = (index, width) => {
    const minWidth = columns[index]?.minWidth ?? DEFAULT_MIN_WIDTH_CELL;
    const maxWidth = columnRefs[index]?.maxWidth ?? DEFAULT_MAX_WIDTH_CELL;
    const newWidth =
      width > maxWidth ? maxWidth : width < minWidth ? minWidth : width;

    columnRefs[index].current.parentElement.style.width = newWidth + "px";
  };

  const setCursorDocument = (isResizing) => {
    document.body.style.cursor = isResizing ? "col-resize" : "auto";
  };

  const handleOnMouseMove = (e) => {
    if (isResizing.current >= 0) {
      const newWidth =
        e.clientX -
        columnRefs[
          isResizing.current
        ].current.parentElement?.getBoundingClientRect().left;
      adjustWidthColumn(isResizing.current, newWidth);
    }
  };

  const handleOnMouseUp = () => {
    console.log("end resize");
    isResizing.current = -1;
    saveColumnInfoLocalStorage();
    setCursorDocument(false);
  };

  const onClickResizeColumn = (index) => {
    console.log("start resize");
    isResizing.current = index;
    setCursorDocument(true);
  };

  return (
    <TableContainer component={Paper}>
        <style>
            {
                `
                .table {
    table-layout: fixed;
  
    .tableHead{
      user-select: none;
    }
    .tableCell {
      border: 1px solid black !important;
      padding: 10px 0;
      &.resizable{
        position: relative;
      }
      &.emptyCell{
        width: "auto"
      }
    }
   
    .resizeLine{
      position: absolute; 
      height: 100%;
      width: 4px;
      top: 0;
      right: -2px;
      cursor: col-resize;
      &:hover{
        background-color: #0AA1DD;
      }
      &:active {
        background-color: #0AA1DD;
  
      }
    }
    
  }
  
  `
            }
        </style>
      <Table className={"table"} sx={{ minWidth: 650 }}>
        <TableHead className={"tableHead"}>
          <TableRow>
            {columns.map((col, colIndex) => (
              <TableCell
                className={"tableCell resizable"}
                key={col.field}
                align="center"
                style={{ width: col?.width ?? "auto" }}
              >
                {col.headerName}
                <div
                  onMouseDown={() => onClickResizeColumn(colIndex)}
                  ref={columnRefs[colIndex]}
                  className={"resizeLine"}
                />
              </TableCell>
            ))}
            <TableCell className="tableCell emtpyCell" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell
                  key={`${row.id}-${col.field}`}
                  align="center"
                  className={"tableCell"}
                >
                  {col.formatValue ? col.formatValue({ row }) : row[col.field]}
                </TableCell>
              ))}
              <TableCell className="tableCell emtpyCell" />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
