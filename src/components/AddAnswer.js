import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function AddAnswer(props) {
    const [open, setOpen] = React.useState(false);
    const [quiz, setQuiz] = React.useState({ 
        answer: ''
    });

    const handleClickOpen = () => {
      setQuiz({
        answer: ''
      });
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged = (event) => {
        setQuiz({...quiz, [event.target.name] : event.target.value})
    }

    const handleSave = () => {
        props.addAnswer(props.link, quiz);
        setOpen(false);
    }

    const [answers, setAnswers] = useState([]);

      useEffect(() => {
      fetchAnswers();
    }, []);


    const fetchAnswers = () => {
     fetch('https://kyselygeneraattorirest.herokuapp.com/getQuestionsFromQuiz/1')
        .then(response => response.json())
        .then(data => setAnswers(data))
        .catch(err => console.error(err))
    }

    const columns = [
      { headerName: "Questions", field: 'question', width: 400 }
    ]

    return (
        <div>
      <Button style={{ marginTop: 10 }} variant="outlined" color="primary" onClick={handleClickOpen}>
        Answer 
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add answer</DialogTitle>
        <DialogContent>
        <div className="ag-theme-material" style={{ height: 400, width: '90%', margin: 'auto' }}>
          <AgGridReact
            rowData={answers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            suppressCellSelection={true}
          />
      </div>
           <TextField
            margin="dense"
            label="Answer"
            name="answer"
            value={quiz.answer}
            onChange={inputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAnswer;