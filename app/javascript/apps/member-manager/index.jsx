import React, { useState } from 'react';
import ReactDataGrid from 'react-data-grid';

import 'react-data-grid/dist/react-data-grid.css';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title', editable: true },
  { key: 'count', name: 'Count', editable: true } ];

const initialRows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];

function MemberManager() {

  const [rows, setRows] = useState(initialRows);

function handleOnGridRowsUpdated({ fromRow, toRow, updated }) {
    console.log('fewfew', fromRow, toRow, updated)
    const slicedRows = rows.slice();
    for (let i = fromRow; i <= toRow; i++) {
      slicedRows[i] = { ...slicedRows[i], ...updated };
    }
    setRows(slicedRows)
  };
  return (<ReactDataGrid
  columns={columns}
  rowGetter={i => rows[i]}
  enableCellSelect={true}
  rowsCount={rows.length}
  onGridRowsUpdated={handleOnGridRowsUpdated}
  minHeight={150} />);
}

export default MemberManager;
