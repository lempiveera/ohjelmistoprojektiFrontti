import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Answerlist() {

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchAnswers();
  }, []);


  const fetchAnswers = () => {
    fetch('https://kyselygeneraattorirest.herokuapp.com/answers')
      .then(response => response.json())
      .then(data => setAnswers(data))
      .catch(err => console.error(err))
  }

  const columns = [
    { headerName: "Questions", field: 'question.question', width: 400, sortable: true, filter: true },
    { field: 'answer', width: 400, sortable: true, filter: true }
  ]

  return (
    <div>
        <div className="ag-theme-material" style={{ height: 900, width: '90%', margin: 'auto' }}>
          <AgGridReact
            rowData={answers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            floatingFilter={true}
            suppressCellSelection={true}
          />
      </div>


    </div>
  );
}

export default Answerlist;