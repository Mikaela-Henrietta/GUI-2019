/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 3.2 
Build an application which has a text area for editing and generating text.
The application should also have radio buttons to select the text size 
from a small set of options (e.g. 9 points, 12 points, 16 points). 
This selection should effect all the text in the text area.
*/
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Helper from'./Helper.js';



const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#5c2d40'
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#3e2679',
  },
  paper: {
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    display:'flex',
    flexDirection: 'column',
  },
  paperSecond: {
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: '500px',
    marginTop: theme.spacing.unit * 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    display:'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing.unit * 10,
  },
 
  button: {
    margin: theme.spacing.unit,
    color: '#FFFFFF',
    backgroundColor: '#3e2679'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  radiobuttons: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  formLabel: {
    fontSize: 20,
    color: '#4A4A4A',
  },
  
})
class App extends Component {
   constructor(props) {
    super(props);
  
    this.state = {
      fontSize: '8',
      text: ''
    };

    this.sample = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    this.generate = this.generate.bind(this);
  }

 componentDidMount() {
   this.generate()
 }
 
  handleChange = event => {
    this.setState({ fontSize: event.target.value });
  };

  generate(event) {
  
    this.setState({ text: Helper.generate(this.sample, 1000)});
    if (event) {
      event.preventDefault();
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <div> 
        <div className={this.props.classes.root}>
          <AppBar className={this.props.classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
                Exercise 3.2
              </Typography>
              <IconButton className={this.props.classes.starButton} color="inherit" aria-label="Star">
              <StarIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Paper className={this.props.classes.paper}>
            <FormLabel className={this.props.classes.formLabel} component="legend">Font size</FormLabel>
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={this.props.classes.group}
              value={this.state.fontSize}
              onChange={this.handleChange}
              >
              <FormControlLabel value="8" control={<Radio />} label="8" />
              <FormControlLabel value="12" control={<Radio />} label="12" />
              <FormControlLabel value="16" control={<Radio />} label="16" />
            </RadioGroup>
            <Button variant="contained" className={this.props.classes.button} onClick={this.generate}>Generate</Button>
          </Paper>
        </div>
        <div>
          <Paper 
            className={this.props.classes.paperSecond}
            style={{fontSize: this.state.fontSize + 'px'}}>
            {this.state.text}
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
