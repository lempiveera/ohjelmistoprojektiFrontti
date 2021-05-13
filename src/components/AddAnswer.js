import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function AddAnswer(props) {
    const [open, setOpen] = React.useState(false);
    const [quiz, setQuiz] = React.useState({
        question: '', 
        answer: ''
    });

    const handleClickOpen = () => {
      setQuiz({
        question: props.quiz.question, 
        answer: props.quiz.answer
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

    return (
        <div>
      <Button style={{ marginTop: 10 }} variant="outlined" color="primary" onClick={handleClickOpen}>
        Go to guiz
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add answer</DialogTitle>
        <DialogContent>
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