'use client';
import React, { useState, useEffect } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import classname from './subscribers.module.css';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';

function Subscribers({ params }) {
  const [subscribers, setSubscribers] = useState([]);
  var colDefs = [
    { headerName: 'Email', field: 'email' },
    { headerName: 'Created At', field: 'created_at' },
    { headerName: 'Event ID', field: 'event_id' },
  ];

  const GetSubscribersList = async () => {
    const response = await fetch(`/api/query_subscribers/?id=${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setSubscribers(await response?.json());
    }
  };
  useEffect(() => {
    GetSubscribersList();
  }, []);
  const gridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      resizable: true,
    },
    // Add any other options you need
  };

  return (
    <div
      className={`${classname['ag-theme-quartz']} ag-theme-quartz-dark mt-10 mx-auto`} // applying the grid theme
      style={{ height: 600, width: '80%' }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        gridOptions={gridOptions}
        columnDefs={colDefs}
        rowData={subscribers}
      />
    </div>
  );
}

export default Subscribers;
