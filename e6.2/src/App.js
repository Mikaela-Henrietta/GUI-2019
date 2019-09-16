/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 6.2
Create an application where information of a list of Person objects is displayed. 
With React: use Table to display all person information. 
*/
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Population from './Population';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#5c2d40'
  },
  grow: {
    flexGrow: 1,
  },
  root2: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  appBar: {
    backgroundColor: '#3e2679',
  },
  h6: {
    padding: 12,
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
      person: people[0],
    };  
  }

  nextPerson = () => {
    if (this.state.personIndex < this.state.people.length - 1 ) {
      this.setState((state) => {
        let index = state.personIndex += 1
        return {
          personIndex: index,
          person: state.people[index]
        };
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div> 
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Exercise 6.2
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Paper className={classes.root2}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Persons</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.people.map((person,index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                 {person.firstName} {person.lastName} 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Paper>
        </div>
      </div>
    ); 
  } 
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
