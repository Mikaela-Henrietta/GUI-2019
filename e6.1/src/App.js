/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 6.1
Create an application for editing the Person objects. 
The application must have a main window/view, where a user can choose a Person and a Dialog where the information can be edited.
*/
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
      form: {
        firstName: '',
        lastName: '',
        birthPlace: '',
        birthDate: '',
      }
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
  handleClickOpen = () => {
    let {birthDate, birthPlace, name} = this.state.activePerson
    let form = {
      firstName: name.first,
      lastName: name.last,
      birthTown: birthPlace.town,
      birthCountry: birthPlace.country,
      birthYear: birthDate.getFullYear(),
    }
    this.setState({ 
      openDialog: true,
      form
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

  handleChange = field => event => {
    this.setState({ 
      form: {
        ...this.state.form,
        [field]: event.target.value
      }
    });
  };
  handleSubmit(event) {
    let {
      firstName,
      lastName,
      birthTown,
      birthCountry,
      birthYear,
    } = this.state.form

    this.setState((state) => {
      let people = state.people
      let peopleMutated = people.map((person, index) => {
        if (index  === this.state.personIndex) {
          person.firstName = firstName
          person.lastName = lastName
          person.birthTown = birthTown
          person.birthCountry = birthCountry
          person.birthYear = birthYear
        } 
        return person
      })
      return {
        peopleMutated,
        openDialog: false
      }
    });
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <div> 
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Exercise 6.1
              </Typography>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MoreVertIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Paper className= {classes.view}>
            <Typography variant="h5" component="h3">
              View
            </Typography>
            <div className= {classes.buttons}>
              <Button className={classes.button} onClick={this.previousPerson} disabled={!this.prevIsActive()}>Previous</Button>
              <Button className={classes.button} onClick={this.nextPerson} disabled={!this.nextIsActive()}>Next</Button>
            </div>
          </Paper>
        </div>
        <div className= {classes.personInfo}>
          <div className= {classes.personInfoText}>
            <Typography  className={classes.h6} variant="h6" component='h6' >
              Name: {this.state.activePerson.firstName} {this.state.activePerson.lastName}
            </Typography>
          </div>
          <div className={classes.personInfoButtons}>
            <Button variant="outlined" className={classes.buttonPersonInfo} onClick={this.handleClickOpen}>
                Edit person info
            </Button>
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
                  label="First name"
                  className={classes.textField}
                  value={this.state.form.firstName}
                  onChange={this.handleChange('firstName')}
                  margin="normal"
                  variant="outlined"
                />
              </form> 
              <form className={classes.container}  >
                <TextField
                  id="outlined-name"
                  label="Last name"
                  className={classes.textField}
                  value={this.state.form.lastName}
                  onChange={this.handleChange('lastName')}
                  margin="normal"
                  variant="outlined"
                />
              </form> 
              <form className={classes.container}  >
                <TextField
                  id="outlined-name"
                  label="Birth town"
                  className={classes.textField}
                  value={this.state.form.birthTown}
                  onChange={this.handleChange('birthTown')}
                  margin="normal"
                  variant="outlined"
                />
              </form> 
              <form className={classes.container}  >
                <TextField
                  id="outlined-name"
                  label="Birth country"
                  className={classes.textField}
                  value={this.state.form.birthCountry}
                  onChange={this.handleChange('birthCountry')}
                  margin="normal"
                  variant="outlined"
                />
              </form> 
              <form className={classes.container}  >
                <TextField
                  id="outlined-name"
                  label="Birth year"
                  className={classes.textField}
                  value={this.state.form.birthYear}
                  onChange={this.handleChange('birthYear')}
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
