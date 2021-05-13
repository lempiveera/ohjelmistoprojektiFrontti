import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddAnswer from './AddAnswer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Quizlist() {

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);


  const fetchQuestions = () => {
    fetch('https://kyselygeneraattorirest.herokuapp.com/quizzes')
      .then(response => response.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error(err))
    console.log(quizzes)
  }

  const addAnswer = (url, addAnswer) => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(addAnswer),
      headers: { 'Content-type': 'application/json' }
    })
      .then(_ => fetchQuestions())
      .catch(err => console.error(err))
  }

  const columns = [
    { field: 'title', width: 400, sortable: true, filter: true },
    {
      headerName: '',
      field: 'id',
      width: 200,
      cellRendererFramework: params =>
        <AddAnswer
          link={`https://kyselygeneraattorirest.herokuapp.com/quizzes/${params.value}`}
          quiz={params.data} addAnswer={addAnswer}
        />
    }
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

export default Quizlist;