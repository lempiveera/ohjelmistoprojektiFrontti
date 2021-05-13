import './App.css';
import Quizlist from './components/Quizlist';
import Answerlist from './components/Answerlist';
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Quizzes" />
           <Tab value="two" label="Answers" />
            </Tabs>
          </AppBar>
       {value === 'one' && <Quizlist />}
      {value === 'two' && <Answerlist />}
    </div>
  );
}

export default App;
