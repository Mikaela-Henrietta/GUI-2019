/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 7.3
Create an application which consists of Toolbar and a collection of items displaying information of people. 
The toolbar should enable the user to adjust display to have small items with no details or larger items 
with details. In addition, the toolbar should allow the user to choose, how the person collection is sorted 
for display and to generate a new set of people.
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
let localization = {
  fi: {
    'edit': 'Muokkaa',
    'Edit person info':'Muokkaa henkilötietoja',
    'First name': 'Etunimi',
    'Last name': 'Sukunimi',
    'Birth town': 'Syntymäkaupunki',
    "Birth country": 'Syntymämaa',
    'Birth year': 'Syntymävuosi',
    'Name': 'Nimi',
    'Exercise 7.1': 'Harjoitus 7.1',
    'View': 'Henkilönäkymä',
    'Previous': 'Edellinen',
    'Next': 'Seuraava',
    'CANCEL':'PERUUTA',
    'Finnish': 'Suomeksi',
    'English': 'In English',
  },
  en: {
    'edit': 'Edit',
    'Edit person info': 'Edit person info',
    'First name': 'First name',
    'Last name':'Last name',
    'Birth town':'Birth town',
    "Birth country": "Birth country",
    'Birth year': 'Birth year',
    'Name':'Name',
    'Exercise 7.1':'Exercise 7.1',
    'View': 'View',
    'Previous':'Previous',
    'Next': 'Next',
    'CANCEL':'CANCEL',
    'Finnish': 'Finnish',
    'English': 'Suomeksi',
  }
}
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
      currentLanguage: 'fi',
      otherLanguage: 'en',
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
  handleChangeEnglish = () => {
    this.setState({currentLanguage: 'en'})
  }; 
  handleChangeFinnish = () => {
    this.setState({currentLanguage: 'fi'})
  }; 
  getLocale = (key) => {
    return localization[this.state.currentLanguage][key]
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
             Exercise 7.3
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
            {this.getLocale('View')}
            </Typography>
            <div className= {classes.buttons}>
              <Button className={classes.button} onClick={this.previousPerson} disabled={!this.prevIsActive()}>{this.getLocale('Previous')}</Button>
              <Button className={classes.button} onClick={this.nextPerson} disabled={!this.nextIsActive()}>{this.getLocale('Next')}</Button>
            </div>
          </Paper>
        </div>
        <div className= {classes.personInfo}>
          <div className= {classes.personInfoText}>
            <Typography  className={classes.h6} variant="h6" component='h6' >
            {this.getLocale('Name')}: {this.state.activePerson.firstName} {this.state.activePerson.lastName}
            </Typography>
          </div>
          <div className={classes.personInfoButtons}>
            <Button variant="outlined" className={classes.buttonPersonInfo} onClick={this.handleClickOpen}>
            {this.getLocale('Edit person info')}
            </Button>
            <Button variant='outlined' className={classes.buttonPersonInfo} onClick={this.handleChangeFinnish}> 
            {this.getLocale('Finnish')}
            </Button>
            <Button variant='outlined' className={classes.buttonPersonInfo} onClick={this.handleChangeEnglish}> 
            {this.getLocale('English')}
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
            <DialogTitle id="alert-dialog-title">{this.getLocale('edit')}</DialogTitle>
              <form className={classes.container}  >
                <TextField
                  id="outlined-name"
                  label={this.getLocale('First name')}
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
                  label={this.getLocale('Last name')}
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
                  label={this.getLocale('Birth town')}
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
                  label={this.getLocale("Birth country")}
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
                  label={this.getLocale('Birth year')}
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
              {this.getLocale('CANCEL')}
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
