import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Answerlist() {

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchAnswers();
  }, []);


  const fetchAnswers = () => {
    fetch('https://kyselygeneraattorirest.herokuapp.com/answers')
      .then(response => response.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error(err))
    console.log(quizzes)
  }

  const columns = [
    { field: 'question', width: 400, sortable: true, filter: true },
    { field: 'answer', width: 400, sortable: true, filter: true },
  ]


  return (
    <div>
        <div className="ag-theme-material" style={{ height: 400, width: '90%', margin: 'auto' }}>
          <AgGridReact
            rowData={quizzes}
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