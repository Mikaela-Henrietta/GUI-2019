/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 3.3 
Create an application with three SelectFields (combo box equivalents of Material), 
two of them should allow selection of a number between 0..9 and the third one (located between them)
selection of an operator (+, -, * or /). In the botton of the UI, the result of the formed 
mathematical operation should be displayed. I.e., if a user selected 8, + and 4, 12 should be displayed
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
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#3e2679',
  },
  button: {
    margin: 30,
    marginLeft: 40,
    color: '#FFFFFF',
    backgroundColor: '#3e2679',
    padding:10,

  },
  root2: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapFormLabel: {
    fontSize: 12,
    padding: 10,
    marginBottom: 15,
    display: 'block',
  },
  selectFields: {
    padding: 40,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

})
class App extends Component {
   constructor(props) {
    super(props);
  
    this.state = {
      number: '',
      secondNumber:'',
      operator:'',
      count: '',
      result: '',
    };

    
  }
 
  handleChange = event => {
    this.setState({ number: event.target.value});
  };
  handleChange2 = event => {
    this.setState({ secondNumber: event.target.value });
  };
  handleChange3 = event => {
    this.setState({ operator: event.target.value });
  };
  handleCount = result => event => {
    this.setState({ [result]: event.target.value });
  };
  count = () => {
    
    if (this.state.operator === '+') {
       document.getElementById('result').value = parseInt(this.state.number) + parseInt(this.state.secondNumber);
    }
    if (this.state.operator === '-') {
      document.getElementById('result').value = this.state.number - this.state.secondNumber;
    }
    if (this.state.operator === 'x') {
      document.getElementById('result').value = this.state.number * this.state.secondNumber;
    }
    if (this.state.operator === '/') {
      document.getElementById('result').value = this.state.number / this.state.secondNumber;
    }
    return (this.state.result)
  } 

  render() {
    return (
      <div> 
        <div className={this.props.classes.root}>
          <AppBar className={this.props.classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
                Exercise 3.3
              </Typography>
              <IconButton className={this.props.classes.starButton} color="inherit" aria-label="Star">
              <StarIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div className={this.props.classes.selectFields} >
          <form className={this.props.classes.root2} autoComplete="off">
            <FormControl className={this.props.classes.margin}>
            <InputLabel htmlFor="number" className={this.props.classes.bootstrapFormLabel}>
              Number
            </InputLabel>
            <NativeSelect
              value={this.state.number}
              onChange={this.handleChange}
              input={<BootstrapInput name="number" id="number" />}
            >
              <option value="" />
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>

            </NativeSelect>
            </FormControl>
            <FormControl className={this.props.classes.margin}>
            <InputLabel htmlFor="operator" className={this.props.classes.bootstrapFormLabel}>
              Operator
            </InputLabel>
            <NativeSelect
              value={this.state.operator}
              onChange={this.handleChange3}
              input={<BootstrapInput name="operator" id="operator" />}
            >
              <option value="" /> 
              <option value={'+'}>+</option>
              <option value={'-'}>-</option>
              <option value={'x'}>x</option>
              <option value={'/'}>/</option>
            </NativeSelect>
            </FormControl>
            <FormControl className={this.props.classes.margin}>
            <InputLabel htmlFor="secondNumber" className={this.props.classes.bootstrapFormLabel}>
              Number
            </InputLabel>
            <NativeSelect
              value={this.state.secondNumber}
              onChange={this.handleChange2}
              input={<BootstrapInput name="secondNumber" id="secondNumber" />}
            >
              <option value="" />
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
            </NativeSelect>
            </FormControl>
            <Button variant="contained" className={this.props.classes.button} onClick={this.count}>=</Button>
            <TextField   className={this.props.textField}
              id='result'
              value={this.state.result}
              onChange={this.handleCount('result')}
              margin="normal"
              >
            </TextField>
            </form>
        </div>
      </div>
    ); 
  } 
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
