import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';


const styles = () => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#5c2d40'
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    maxWidth:350,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight:'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    margin: 'auto',
  },
  mouseMoveContainer: {
    marginLeft: 20,
    marginBottom: 5,
  },
  formControl: {
    marginLeft: 20,
    marginTop:20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',  
  },
  h3: {
    color: '#5c2d40',
    fontWeight: 400,
  },
   app: {
    backgroundColor: '#D7C7C7',
    height: '100vh',
    padding:100,
    
  }, 
  coordinates: {
    color: '#cf6f7a',
    fontSize: 25,
  } 
})
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      x: 0, 
      y: 0,
      checkedA: false,
      checkedB: false,
      checkedC: false, 
      text: null
    };
    //binds this to clickhandlers
    this.onMouseMove.bind(this)
    this.onClick.bind(this)
    this.onWheel.bind(this)
    this.xElement = null;
    this.yElement = null;
  }

  componentDidMount() {
    // getElementById after dom has rendered
    this.xElement = document.getElementById('myX');
    this.yElement = document.getElementById('myY');
  }
  //call everytime when state changes
  componentWillUpdate(e, state) {
    if (state.x) {
      this.xElement.innerHTML = ' x: ' + state.x
    } 
    if (state.y) {
      this.yElement.innerHTML = ' y: ' + state.y
    } 
  }
  //event handlers
  handleChange = name => event => { // curry function
    // dynamic key [name] /  object literal
    this.setState({ [name]: event.target.checked });
  };

  onClick = event => {
    if (!this.state.checkedA) return
    this.setState({ x: event.clientX, y: event.clientY });
    this.setState({ text: 'Down'});
  };
  onMouseMove = event => {
    if (!this.state.checkedB) return
    this.setState({ x: event.clientX, y: event.clientY }); 
    this.setState({ text: 'Move'});
  };
  onWheel = event => {
    if (!this.state.checkedC) return
    this.setState({ x: event.clientX, y: event.clientY });
    this.setState({text:'Wheel'});
  }

  render() {
    return (
      <div onMouseMove={this.onMouseMove} onClick={this.onClick} onWheel={this.onWheel} className={this.props.classes.app}>
        <AppBar position='fixed' className={this.props.classes.root}>
          <Toolbar> 
          <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
            Exercise 1.4
          </Typography>
        </Toolbar>
        </AppBar>
        <Paper className={this.props.classes.paper}>
          <div className={this.props.classes.formControl}>
            <FormControlLabel className={this.props.classes.formControlLabel}
              control={
                <Checkbox 
                  checked={this.state.checkedA}
                  onChange={this.handleChange('checkedA')} 
                  color="default"
                />
              }
              label="onMouseDown"
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={this.state.checkedB}
                  onChange={this.handleChange('checkedB')} 
                  color="default"
                />
              }
              label="onMouseMove"
              />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedC}
                  onChange={this.handleChange('checkedC')} 
                  color="default"
                />
              }
              label="onWheel"
            />
          </div>
          <div className={this.props.classes.mouseMoveContainer}>
            <h3 className={this.props.classes.h3}> Mouse: {this.state.text} 
              <span className={this.props.classes.coordinates}>
                <span id="myX"></span>
                <span id="myY"></span>
              </span>
            </h3>
          </div>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(App);

