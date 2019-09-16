/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 5.1
Create an application which includes a component which uses painting operations (not Images) to draw a couple of houses. 
(with React you don't need to create a separate component, your App can contain the canvas). 
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
    display: 'flex',
    flexDirection: 'row',
  }
})
class App extends Component {
   constructor(props) {
    super(props);
    
    this.canvas = null;
  }
   componentDidMount() {
		this.renderCanvas();
	 }
  render() {
    const { classes } = this.props;
    return (
      <div > 
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Exercise 5.1
              </Typography>
              <IconButton className={classes.starButton} color="inherit" aria-label="Star">
              <StarIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.root1}>
          <div>
            <canvas ref={(el) => {this.canvas = el;}}  width="300" height="600"></canvas> 
          </div>
          <div>
            <canvas ref={(el) => {this.canvas2 = el;}}  width="300" height="600"></canvas> 
          </div>
        </div>
      </div>
    ); 
  } 
  renderCanvas() {
    
    let ctx = this.canvas.getContext('2d');
        // Set line width
    ctx.lineWidth = 3;

    // Wall
    ctx.strokeRect(75, 140, 150, 400);

    // Door
    ctx.fillRect(130, 480, 40, 60);
   
    //window
    ctx.strokeRect(115, 210, 70, 25);
    //window
    ctx.strokeRect(115, 270, 70, 25);

    // Roof
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();

    let ctx2 = this.canvas2.getContext('2d');
    // Set line width
    ctx.beginPath();
    ctx2.lineWidth = 3;

    // Wall

    ctx2.strokeRect(75, 430, 195, 110);

    // Door
   
    ctx2.fillRect(130, 480, 40, 60);
   
    //window
    ctx2.strokeRect(190, 480, 40, 30);

    // Roof
    ctx2.moveTo(50, 430);
    ctx2.lineTo(175, 200);
    ctx2.lineTo(300, 430);
    ctx2.closePath();
    ctx2.stroke();
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);