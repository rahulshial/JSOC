import React, {useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';

export default function Events() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  });

  // TODO: https://github.com/mui-org/material-ui-x/issues/246
  const [selection, setSelection] = useState([]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        checkboxSelection
        onSelectionChange={(newSelection) => {
          setSelection(newSelection.rowIds);
        }}
        {...data}
      />
    </div>
  );
}