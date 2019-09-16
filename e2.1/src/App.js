/*
Course: TIEVA31 Principles of Programming Graphical User Interfaces 2018 - 2019
mikaela.lindfors@tuni.fi
Exercise 2.1 Build an application, which has AppBar with a menu containing an option to navigate to a new web page. 
The selection must display a confirmation <Dialog> and move to another page only if the user confirms. 
*/
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
  
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    backgroundColor: '#3e2679',
  }

})
class App extends Component {
   constructor(props) {
    super(props);
    //initial state
    this.state = {
      open: false,
      openDialog: false,
    };
  } 
  //cklick handlers
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };
  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };
  handleClose = () => {
    this.setState({ openDialog: false });
  };
  linkTo = () => {
    window.location = 'https://www.tuni.fi'
  };

  render() {
    const { open } = this.state;
    return (
      <div> 
        <div className={this.props.classes.root}>
          <AppBar className={this.props.classes.appBar} position="static">
            <Toolbar>
              <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu" buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}>
              <MenuIcon />
              </IconButton>
              <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper> 
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        <MenuItem  onClick={this.handleClose} onClick={this.handleClickOpen}>Go to page: www.tuni.fi</MenuItem> 
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
              <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
                Exercise 2.1
              </Typography>
              <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
              <MoreVertIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Dialog
            open={this.state.openDialog}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm navigation"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you agree, you are tranferred to the page www.tuni.fi.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Disagree
              </Button>
              <Button  onClick={this.linkTo} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    ); 
  } 
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
