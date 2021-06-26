import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Navbar from './components/Navbar';
import APOD from './components/APOD';

const App = () => {

  return(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Navbar />
      <APOD />
    </MuiPickersUtilsProvider>
  )
}

export default App;