/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 5.3
Create an application which draws a simple face (or it can be a complex face if you want to). 
The face should update whenever mouse cursor/finger moves over it so that eyes look at the cursor/finger all the time.
*/
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';

const styles = theme => ({

  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#d0578f',
  },
 
  root1: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    padding: 0,
  },
  canvas: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
})

class App extends Component {
   constructor(props) {
    super(props);

    this.canvas = null;
    this.container = null;
  }
 
  componentDidMount() {
    this.container.addEventListener('mousemove', this.mouseMove.bind(this), false);
    this.renderCanvas();
    this.movingEye(0, 0);
  }

  mouseMove(e) {
    let centerX = window.innerWidth / 2; 
    let centerY = window.innerHeight / 2;
    let moveX = centerX - e.x  //location of the mouse
    let moveY = centerY - e.y
    let eyeMoveX = (6 / centerX) * moveX //6 is max area of the eye movement 
    let eyeMoveY = (6 / centerY) * moveY
    this.renderCanvas();
    this.movingEye(eyeMoveX, eyeMoveY);
  }
  render() {
    const { classes } = this.props;
    return (
      <div > 
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Exercise 5.3
              </Typography>
              <IconButton className={classes.starButton} color="inherit" aria-label="Star">
              <StarIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div ref={(el) => {this.container = el;}}  className={classes.root1}>
          <canvas ref={(el) => {this.canvas = el;}}  width="200" height="200" className={classes.canvas}></canvas> 
        </div>
      </div>
    ); 
  } 
  
  renderCanvas() {
  
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
       
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.fillStyle = "#f9e93f";
    ctx.arc(100,100,99,0,Math.PI*2); // head
    ctx.fill();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(170,100);
    ctx.arc(100,100,70,0,Math.PI);   // Mouth
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.arc(55,65,15,0,Math.PI*2);  // Left eye outer
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.arc(135,65,15,0,Math.PI*2);  // Right eye outer
    ctx.fill();
  }
  movingEye(x, y) {
    let ctx = this.canvas.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(55 - x,65 - y,8,0,Math.PI*2);  // Left eye
    ctx.fill();
  
    ctx.beginPath();
    ctx.arc(135 - x,65 - y,8,0,Math.PI*2);  // Right eye
    ctx.fill();
  }

} 
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

