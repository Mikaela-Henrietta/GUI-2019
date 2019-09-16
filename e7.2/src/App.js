/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 7.2
Build an application where the user can convert currency values between UK pounds and US dollars or another pair of currencies of your choosing. 
The application must allow user to switch between the direction of conversion
format the results value correctly (in Java use currency support in NumberFormat, 
in React use DateTimeFormat or String.toLocaleString.
*/
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
  root1:{ 
  padding:50,
  },
  root: {
    flexGrow: 1,
    backgroundColor: '#5c2d40'
  },
  root2:{ 
    padding:20,
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
  convert: {
    fontSize: 25,
    marginBottom: 20,
  },
  textField: {
    marginLeft:20,
  },
  direction: {
    padding: 20,
  },
  button: {
    margin: 20,
  }
})

class App extends Component {
   constructor(props) {
    super(props);
   
    this.state = {
      direction: 'pounds',
      date: new Date(),
      money: 0
    };
  }
  //Gives the correct date 
  getCurrentDate() {
    let locale = this.state.direction === 'dollars' ? 'en-GB' : 'en-US'
    return new Intl.DateTimeFormat(locale, { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit',
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric'
    }).format(this.state.date)
  }
  //Gives the correct currency 
  getLocaleMoney() {
    let locale = this.state.direction === 'dollars' ? 'en-GB' : 'en-US'
    let currency = this.state.direction === 'dollars' ? 'GBP' : 'USD'
    return new Intl.NumberFormat(locale, {style: 'currency', currency}).format(this.state.money)
  }
  handleChange = (event) => {
    this.setState({direction: event.target.value})
  }
  handleMoney = (event) => {
    this.setState({money: event.target.value})
  }

  render() {
    const { classes } = this.props;
    return (
      <div> 
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
             Exercise 7.2
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.root1}>
          <div className={classes.date}>
          {this.getCurrentDate()}
          </div>
          <td>
      </td>
          <div className={classes.root2}>
            <Typography className={classes.convert}>Convert:</Typography> 
            <div className={classes.textField}>
              <input type="number" value={this.state.money} onChange={this.handleMoney} />
              <Typography>{this.state.direction === 'pounds' ? 'British pounds' : 'US Dollars'}</Typography>
              <Typography>{this.getLocaleMoney()}</Typography>
            </div>
          </div>
          <div className={classes.direction}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Direction</FormLabel>
              <RadioGroup
                aria-label="Direction"
                name="direction"
                className={classes.group}
                value={this.state.direction}
                onChange={this.handleChange}
              >
                <FormControlLabel value="pounds" control={<Radio />} label="Pounds to Dollars" />
                <FormControlLabel value="dollars" control={<Radio />} label="Dollars to Pounds" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
    ); 
  } 
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
