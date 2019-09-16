import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './App.css';





const styles = theme => ({
  //transition:'scale 3s ease-in-out',
  root: {
    flexGrow: 1,
    backgroundColor: '#5c2d40'
  },
  grow: {
    flexGrow: 1,
  },
  
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    backgroundColor: '#f1724d',
    boxShadow: 'none',
  },
  card: {
    maxWidth: 270,
    minWidth: 270,
    margin:20,
    padding:0,
    overflow:'hidden'
  },
  media: {
    height: 140,
  },
  cardDiv: {
    backgroundColor: '#f8f9f3',
    height:'100vh',
    marginTop: 0,
    padding:100,
  },

})

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      scale: 0.8
    }
  }
  onScale = () => {
  this.setState ({
    scale: this.state.scale > 0.8 ? 0.8 : 1.5,
  })
   setTimeout(()=> {
    if (this.state.scale > 0.8 ) {
      this.setState({scale:0.8})
    }
  },3000) 
  } 
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
              Exercise 8.1
              </Typography>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <StarIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.cardDiv}>
          <Card className={classes.card} style={{...this.styles, transform: 'scale(' + this.state.scale + ')' }} >
            <CardActionArea onClick={this.onScale}>
              <CardMedia
                className={classes.media}
                image="/kuva.jpg"
                title="Kuva"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" >
                Card
                </Typography>
                <Typography style={{color:'#2a7881'}} component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp
                or incididunt ut labore et dolore magna aliqua. Ut ...
                </Typography> 
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small"  style={{color:'#ee5744',marginLeft:'auto'}} onClick={this.onScale}>
              Expand
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    ); 
  } 
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);

