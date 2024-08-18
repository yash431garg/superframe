'use client';
import React, { useState, useEffect } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import classname from './subscribers.module.css';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';

function Subscribers({ params }) {
  const [subscribers, setSubscribers] = useState([]);
  const [gridApi, setGridApi] = useState();
  var colDefs = [
    { headerName: 'Email', field: 'email' },
    { headerName: 'Registration time', field: 'created_at' },
    { headerName: 'Fid', field: 'fid' },
  ];

  const GetSubscribersList = async () => {
    const response = await fetch(`/api/query_subscribers/?id=${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response?.json()
      console.log(data)
      setSubscribers(data);
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

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const exportCSV = () => {
    const params = {
      fileName: 'registration.csv',
      columnSeparator: ',',
    };
    gridApi.exportDataAsCsv(params);
  };

  return (
    <>
      <div className="mx-auto mt-4" style={{ width: '80%' }}>
        <button
          type="submit"
          onClick={exportCSV}
          className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500"
        >
          Export Csv
        </button>
      </div>
      <div
        className={`${classname['ag-theme-quartz']} ag-theme-quartz-dark mt-2 mx-auto mb-5`} // applying the grid theme
        style={{ height: 600, width: '80%' }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          gridOptions={gridOptions}
          columnDefs={colDefs}
          rowData={subscribers}
          onGridReady={onGridReady}
        />
      </div>
    </>
  );
}

export default Subscribers;
