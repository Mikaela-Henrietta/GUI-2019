/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 4.4
Create an application, which consists of:
Select Field (React) with names of colors ("red", "green", "purple", "magenta" etc.) as items. 
Three JSliders to select a color using RGB model (i.e., one slider adjust red value, second green value and the third blue value). 
The color should be visualized in the interface in real time."Add to list" button, which adds a component with the color name text
and the actual color to an area. Any number of colors can be added to this area. You can decide, exactly what the component is, 
what the list looks like etc. (it doesn't have to be particularly elegant for this exercise).Undo and Redo operations  with, e.g. buttons (React). 
These should undo/redo both the slider adjustments and the "Add to list" clicks.
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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import Slider from '@material-ui/lab/Slider';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root0: {
    marginLeft: 150,
    marginTop: 100,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#3e2679',
  },
  root2:{
    marginTop: 60,
    marginLeft: 10,
    marginBottom: 40,
  },
  root3: {
    width: 300,
  },
  formControl: {
    minWidth: 130,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  slider: {
    padding: '22px 0px',
  },
  adjustColor: {
    marginBottom: 30,
    fontSize: 20,
  },
  button: {
    backgroundColor:"#3e2679",
    color: '#FFFFFF',
    marginLeft: 30,
    marginTop: 10,
  },
  colorList: {
    marginTop: 50,
  },
  paper: {
    maxWidth: 300,
    minWidth: 300,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
  },
  undoRedo: {
    marginTop: 50,
    display: 'flex',
    marginLeft: 35,
  },

})
class App extends Component {
   constructor(props) {
    super(props);
    
    this.state = {
      currentValue: '',
      color: '',
      labelWidth: 0,
      slider: {
        red: 0,
        green: 0,
        blue: 0
      },
      colors: [],
      history: [[]],
      historyIndex: 0,
      pickColors: [
        {
          name: 'red',
          red: 255,
          green: 0,
          blue: 0
        }, {
          name: 'green',
          red: 0,
          green: 255,
          blue: 0
        }, {
          name: 'blue',
          red: 0,
          green: 0,
          blue: 255
        },
      ]
    };
    this.addNewColor.bind(this)
  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
   }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  saveHistory = () => {
    this.setState((state) => {
      let history = [...this.state.history]
      // deep clone object array
      const colors = this.state.colors.map(a => ({...a}))
      let historyIndex = this.state.historyIndex + 1 //pointer to current history state
      history[historyIndex] = colors
      return {
        history,
        historyIndex
      }
    })
  }
  //change sliders state
  handleSlide = (color, value) => {
    this.setState((state) => {
      let slider = state.slider
      slider[color] = value
      return {
        slider        
      }
    }, this.debouncedColorChange(color, value))
  }

  debouncedColorChange = this.debounce((color, value) => {
    this.setState((state) => {
      let colors = [...state.colors]
      if (colors.length && colors[colors.length - 1][color] !== undefined) {
        colors[colors.length - 1][color] = value
      }
      return {
        colors
      }
    });
    this.saveHistory()
    
  }, 200); //milliseconds delay


  // https://gist.github.com/beaucharman/1f93fdd7c72860736643d1ab274fee1a
  debounce(callback, wait, immediate = false) {
    let timeout = null 
    return function() {
      const callNow = immediate && !timeout
      const next = () => callback.apply(this, arguments)    
      clearTimeout(timeout)
      timeout = setTimeout(next, wait)
      if (callNow) {
        next()
      }
    }
  }

  addNewColor = () => {
    let selectedColor = this.state.pickColors.find((color) => {
      return color.name === this.state.color
    })
    this.setState((state) => {
      return {
        slider: selectedColor,
        colors: [...state.colors, selectedColor]
      }
    }, this.saveHistory);
  }

  generateRGB = ({red, green, blue}) => {
    return {
      backgroundColor: `rgb(${red}, ${green}, ${blue})`
    }
  }


  undo = () => {
    if (this.state.historyIndex === 0 ) {
      return
    }
    this.setState(() => {
      let stepBackward = [...this.state.history[this.state.historyIndex - 1]]
      let slider = null
      if (stepBackward.length > 0 ) {
        slider = stepBackward[stepBackward.length - 1]
      } else {
        slider = {
          red: 0,
          green: 0,
          blue: 0
        }
      }
      return {
        colors: stepBackward,
        slider,
        historyIndex: this.state.historyIndex - 1
      }
    })
  }
  redo = () => {
    if (this.state.historyIndex + 1 > this.state.history.length || this.state.history.length === 0) {
      return
    }
    if (this.state.historyIndex + 1 < this.state.history.length) {
      this.setState(() => {
        console.log(this.state.history, this.state)
        let stepForward = [...this.state.history[this.state.historyIndex + 1]]
        let slider = null
        if (stepForward.length > 0 ) {
          slider = stepForward[stepForward.length - 1]
        } else {
          slider = {
            red: 0,
            green: 0,
            blue: 0
          }
        }
        return {
          colors: stepForward,
          slider,
          historyIndex: this.state.historyIndex + 1
        }
      })
    }
  }
  
 
  
  render() {
    const { classes } = this.props;
    return (
      <div > 
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Exercise 4.4
              </Typography>
              <IconButton className={classes.starButton} color="inherit" aria-label="Star">
              <StarIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.root0}> 
          <div className={classes.root2}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="pick-color"
              >
              Pick a color 
              </InputLabel>
              <Select
                value={this.state.color}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="color"
                    id="pick-color"
                  />
                }
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.pickColors.map(({name}, index) => (
                <MenuItem value={name} key={'color_' + index}>{name}</MenuItem>
              ))}
              </Select>
            </FormControl>
            <Button variant="contained"  className={classes.button}   onClick={this.addNewColor}>Add to list</Button>
          </div>
          <div className={classes.root3}>
            <Typography className={classes.adjustColor}>Adjust color</Typography>
            <Typography id="red">Red</Typography>
            <Slider
              classes={{ container: classes.slider }}
              value={this.state.slider.red || 0}
              aria-labelledby="red"
              max={255}
              onChange={(e, value) => this.handleSlide('red', value)}
            />
            <Typography id="green">Green</Typography>
            <Slider
              classes={{ container: classes.slider }}
              value={this.state.slider.green || 0}
              aria-labelledby="green"
              max={255}
              onChange={(e, value) =>  this.handleSlide('green', value)}
            />
               <Typography id="blue">Blue</Typography>
            <Slider
              classes={{ container: classes.slider }}
              value={this.state.slider.blue || 0}
              aria-labelledby="blue"
              max={255}
              onChange={(e, value) =>  this.handleSlide('blue', value)}
            />
          </div>
          <div className={classes.colorList}>
          {this.state.colors.map((color, index) => (
            <Paper 
            className={classes.paper}
            value={this.state.color}
            key={index}
            style={this.generateRGB(color)}
            >
              {color.name}
            </Paper>
          ))}

          </div>
          <div className={classes.undoRedo}>
            <Button variant="contained"  className={classes.button} onClick={this.undo}>Undo</Button>
            <Button variant="contained"  className={classes.button} onClick={this.redo}>Redo</Button>
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