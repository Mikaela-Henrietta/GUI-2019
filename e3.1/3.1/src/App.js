
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Population from './Population';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,  DatePicker } from 'material-ui-pickers';
import Helper from'./Helper.js';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#5c2d40'
  },
  grow: {
    flexGrow: 1,
  },
  
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    backgroundColor: '#3e2679',
  },
  view: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    display:'flex',
   
  },
  buttons: {
    maxWidth: '900px',
    marginLeft: 'auto',
    marginRight: 50,
    display:'flex',
    flexDirection: 'row',
    alignItems: 'right',
  },
  personInfo: {
    padding: 30,
    alignItems: 'right',
    maxWidth: 600,
    margin:'auto',
    display:'flex',
    flexDirection:'row',
  },
  h6: {
    padding: 12,
  },
  personInfoText: {
    display:'block', 
  },
  buttonPersonInfo: {
    margin: 10,
  },
  personInfoButtons: {
    display:'Block',
    maxWidth:200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})
class App extends Component {
   constructor(props) {
    super(props);
    let population = new Population("UK")
    let people = []
    for(let i = 0; i < 10; i++) {
      people.push(population.getPerson())
      population.nextPerson()
    }

    this.state = {
      people,
      personIndex: 0,
      activePerson: people[0],
      openDialog: false,
      mutatingValue: '',
      mutatingField: null,
    };
    console.log(this.state)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDateChange = date => {
    let people = [...this.state.people];
    let birthYear = date.getFullYear()
    let birthDay = date.getDate()
    let birthMonth = date.getMonth()
    let activePerson = {
      ...this.state.activePerson,
      birthMonth, 
      birthDay, 
      birthYear,
    } 
    people[this.state.personIndex] = activePerson
    this.setState({ people, activePerson });
  };ki
  nextPerson = () => {
    if (this.state.personIndex < this.state.people.length - 1 ) {
      this.setState((state) => {
        let index = state.personIndex += 1
        return {
          personIndex: index,
          activePerson: state.people[index]
        };
      })
    }
  }

  previousPerson = () => {
    if (this.state.personIndex > 0 ) {
      this.setState((state) => {
        let index = state.personIndex -= 1
        return {
          personIndex: index,
          activePerson: state.people[index]
        };
      })
    }
  }

  nextIsActive = () => {
    return this.state.personIndex < this.state.people.length - 1
  };
  prevIsActive = () => {
    return this.state.personIndex > 0
  };
  handleClickOpen = (field) => () => {
    this.setState({ 
      openDialog: true, 
      mutatingField: field,
      mutatingValue: this.state.people[this.state.personIndex][field]
    });
  };
  handleClose = (event) => {
    this.setState({ 
      openDialog: false,
      mutatingValue: '',
      mutatingField: null,
    });
    event.preventDefault();
  };
  handleChange = event => {
    this.setState({mutatingValue: event.target.value});
  };
  handleSubmit(event) {
    let people = [...this.state.people];
    let person = people[this.state.personIndex];
    person[this.state.mutatingField] = this.state.mutatingValue;

    this.setState({ 
      people,
      mutatingValue: '',
      mutatingField: null,
      openDialog: false
    });
    event.preventDefault();
  }

  parseDate({birthMonth, birthDay, birthYear}) {
    return new Date(Date.parse(`${birthMonth} ${birthDay} ${birthYear}`));
  }

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <div> 
        <div className={this.props.classes.root}>
          <AppBar className={this.props.classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
                Exercise 3.1
              </Typography>
              <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
              <MoreVertIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Paper className= {this.props.classes.view}>
            <Typography variant="h5" component="h3">
              View
            </Typography>
            <div className= {this.props.classes.buttons}>
              <Button className={classes.button} onClick={this.previousPerson} disabled={!this.prevIsActive()}>Previous</Button>
              <Button className={classes.button} onClick={this.nextPerson} disabled={!this.nextIsActive()}>Next</Button>
            </div>
          </Paper>
        </div>
        <div className= {this.props.classes.personInfo}>
          <div className= {this.props.classes.personInfoText}>
            <Typography  className={this.props.classes.h6} variant="h6" component='h6' >
              First name: {this.state.activePerson.firstName}
            </Typography>
            <Typography className={this.props.classes.h6} variant="h6" component='h6'>
                Last name: {this.state.activePerson.lastName}
            </Typography>
            <Typography className={this.props.classes.h6} variant="h6" component='h6'>
                Birth town: {this.state.activePerson.birthTown}
            </Typography>
            <Typography className={this.props.classes.h6} variant="h6" component='h6'>
                Birth year: {this.state.activePerson.birthYear}
            </Typography>
            <Typography className={this.props.classes.h6} variant="h6" component='h6'>
                Birth date: {this.state.activePerson.birthDay}.{this.state.activePerson.birthMonth}
            </Typography>
          </div>
          <div className={this.props.classes.personInfoButtons}>
            <Button variant="outlined" className={classes.buttonPersonInfo} onClick={this.handleClickOpen('firstName')}>
                Edit first name
            </Button>
            <Button variant="outlined" className={classes.buttonPersonInfo} onClick={this.handleClickOpen('lastName')}>
                Edit last name
            </Button>
            <Button variant="outlined" className={classes.buttonPersonInfo} onClick={this.handleClickOpen('birthTown')}>
                Edit birth town
            </Button>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                  margin="normal"
                  label="Date picker"
                  minDate={new Date(-8520341989000)}
                  value={this.parseDate(this.state.activePerson)}
                  onChange={this.handleDateChange}
                />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div>
          <Dialog
            open={this.state.openDialog}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"EDIT"}</DialogTitle>
              <form className={classes.container}  >
                <TextField
                  id="outlined-name"
                  label=""
                  className={classes.textField}
                  value={this.state.mutatingValue}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                />
                
              </form> 
            <DialogActions>
              <Button  color="primary" onClick={this.handleSubmit} autoFocus >
                OK
              </Button>
              <Button  onClick={this.handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    ); 
  } 
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
