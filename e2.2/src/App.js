/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 2.2 An interface for viewing information on people. 
The application uses the Population class to generate People objects. A user is able to navigate to the next/previous person. 
The application has "View"  with "Next" and "Previous" options. 
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


const styles = () => ({
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
  },
  h6: {
    padding: 10,
  }
})
class App extends Component {
   constructor(props) {
    super(props);
    this.population = new Population("UK")
    this.state = {
      person: this.population.getPerson()
    };
  }

  nextPerson = () => {
    this.setState({person: this.population.nextPerson()})
  }

  previousPerson = () => {
    this.setState({person: this.population.previousPerson()})
  }

  render() {
    const { classes } = this.props;
    return (
      <div> 
        <div className={this.props.classes.root}>
          <AppBar className={this.props.classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
                Exercise 2.2
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
              <Button className={classes.button} onClick={this.previousPerson} >Previous</Button>
              <Button className={classes.button} onClick={this.nextPerson} >Next</Button>
            </div>
          </Paper>
        </div>
        <div className= {this.props.classes.personInfo}>
          <Typography className={this.props.classes.h6} variant="h6" component='h6' >
              First name: { this.state.person.firstName}
          </Typography>
          <Typography className={this.props.classes.h6} variant="h6" component='h6'>
              Last name: { this.state.person.lastName}
          </Typography>
          <Typography className={this.props.classes.h6} variant="h6" component='h6'>
              Birth town: { this.state.person.birthTown}
          </Typography>
          <Typography className={this.props.classes.h6} variant="h6" component='h6'>
              Birth year: {this.state.person.birthYear}
          </Typography>
        </div>
      </div>
    ); 
  } 
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
