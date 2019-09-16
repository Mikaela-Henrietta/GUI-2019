/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 5.2
An application where a user can select a picture and add two lines of captions on top of it.
*/

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({

  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#f857b7',
  },
 
  canvas: {
    padding: 0,
    display:'flex',
  },
  dialogButtons: {
    float: 'right',
    margin: 8,
  }
})

class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      dialogNameUpper: 'Set upper text',
      dialogNameLower: 'Set lower text',
      width: window.innerWidth,
			height: window.innerHeight,
      anchorEl: null,
      open: {
        image: false,
        upper: false,
        lower: false,
      },
      selectedImage: null,
      texts: {
        upper: '',
        lower: ''
      }
    };
    this.canvas = null;
    this.container = null;
    this.images = [{
      name: 'Image 1', 
      src: './img1.jpg', 
    }, {
      name: 'Image 2',
      src: './img2.jpg',
    }]
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = (image)=> {
    this.setState({selectedImage: image}, this.renderCanvas);
    this.setState({
      open: {
        ...this.state.open,
        image: false,
      }
    });
  };
  handleClickOpen = (dialog) => {
    this.setState({
      open: {
        ...this.state.open,
        [dialog]: true,
      }
    });
  };

  handleCloseDialog = dialog => {
    this.setState({
      open: {
        ...this.state.open,
        [dialog]: false,
      }
    });
  };
  textOnChange = (val, field) => {
    this.setState({
      texts: {
        ...this.state.texts,
        [field]: val.currentTarget.value,
      }
    });
  }
  setText = dialog => {
    this.handleCloseDialog(dialog)
    this.renderCanvas()
  }

  componentDidMount() {
   this.renderCanvas();
  }
  renderDialog(upperLower) {
    const { classes, ...other } = this.props;
    return (
      <Dialog open={this.state.open[upperLower]} onClose={() => this.handleCloseDialog(upperLower)} aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle id="simple-dialog-title">Set {upperLower} text</DialogTitle>
        <div>
          <List>
            <ListItem>
            <TextField
              id="outlined-bare"
              className={classes.textField}
              defaultValue=""
              margin="normal"
              variant="outlined"
              onChange={(val) => this.textOnChange(val, upperLower)}
            />
            </ListItem>
          </List>
          <div className={classes.dialogButtons}>
            <Button onClick={() => this.cancelText(upperLower)}>Cancel</Button>
            <Button onClick={() => this.setText(upperLower)} color='primary'>Set</Button>
          </div>
        </div>
      </Dialog>
    )
  }

  render() {
    const { anchorEl } = this.state;
    const { classes, onClose, selectedValue, ...other } = this.props;
    return (
      <div > 
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Exercise 5.2
              </Typography>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
              <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleCloseMenu}
              >
                <MenuItem onClick={() => this.handleClickOpen('image')}>Set image</MenuItem>               
                <MenuItem onClick={() => this.handleClickOpen('upper')}>Set upper text</MenuItem>
                <MenuItem onClick={() => this.handleClickOpen('lower')}>Set lower text</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Dialog open={this.state.open['image']} onClose={() => this.handleCloseDialog('image')} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title">Set image</DialogTitle>
            <div>
              <List>
                {this.images.map(image => (
                  <ListItem key={image.name} button onClick={() => this.handleListItemClick(image)} >
                    <ListItemText primary={image.name}/>
                      
                  </ListItem>
                ))}
              </List>
            </div>
          </Dialog>
            {this.renderDialog('upper')}
            {this.renderDialog('lower')}
          <div ref={(el) => {this.container = el;}}  className={classes.root1}>
            <canvas ref={(el) => {this.canvas = el;}}  width={this.state.width} 
              height={this.state.height} className={classes.canvas}>
            </canvas> 
          </div>
        </div>
      </div>
    ); 
  } 
  
  renderCanvas() {
    let ctx = this.canvas.getContext("2d");
    let image = new Image()
    image.onload = () => {
      ctx.drawImage(image, 2, 2);
      ctx.font = "120px Avenir";
      ctx.fillText(this.state.texts.upper, 40, 150);
      ctx.font = "120px Avenir";
      ctx.fillText(this.state.texts.lower, 40, 500);
    }
    if (this.state.selectedImage) {
      image.src = this.state.selectedImage.src
    }
  }
} 
App.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(App);

