import React, { Component} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import StarIcon from '@material-ui/icons/StarRate';
import { withRouter } from 'react-router';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {Col} from 'react-bootstrap';
import { fade } from '@material-ui/core/styles/colorManipulator';
import $ from 'jquery';
import Grid from '@material-ui/core/Grid';
import TopMovie from './TopMovies';
const styles = theme => ({

  card: {
    marginTop:50,
   minWidth: 465,
   minHeight:400,
   display:'inline-block',
   backgroundColor:'grey',
   color:'white'
 },
 media: {


 },
 search: {
marginTop:20,
    position: 'relative',
    borderWidth: 2,
   borderColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.dark, 0.75),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.15),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    '&:hover':{
      color:'black',
    },
  },
  inputRoot: {
    color: 'white',
    fontWeight:'bold',
    '&:hover':{
      color:'black',
    },
    width: '100%',
    fontSize:18
  },

  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});


class App extends Component {
  state={
    valueTabs:0,
    searchValue:"",
    movies:{},
    isHidden: false,
    text:""
  }
  componentWillMount(){
    if(sessionStorage.getItem('text'))
    this.searchMovie(sessionStorage.getItem('text'));
  }
  componentDidMount(){
    sessionStorage.setItem('text',"");

  }
  searchMovie=(text)=>{
    var obj={};
      var text;
      var length;
    if(typeof(text)!=='string')
    {
    text=text.target.value;
    this.setState({text:text})
    length=text.length;
  }
  else{
text=sessionStorage.getItem('text');
length=text.length;

  }


    if(length>2)
    {
      this.setState({
        isHidden: true
      })
      const url="https://api.themoviedb.org/3/search/movie?api_key=38a6fb9c67512590950aabe3f677f0ac&query="+text;
      $.ajax({
        url:url,
        success:(response)=>{
          response.results.forEach((movie,index)=>{
            obj[index]=movie;
            this.setState({movies:obj})
          })
        },
        error:(xhr,status, err)=>{
          console.log(err)
        },

      })

    }
    else{
      this.setState({
        isHidden: false
      })
    }

  }
  toggleHidden=()=> {
      this.setState({
        isHidden: !this.state.isHidden
      })
    }
  handleChange = (event, value) => {
    this.setState({ valueTabs:value });
  };

movieDetails=(id)=>{
  const {history}=this.props;
  history.movieId=id;
  sessionStorage.setItem('text', this.state.text);
  history.push('/MovieDetails');
}

  render() {
    const { classes, history } =this.props;
    const {movies}=this.state;
    return (
<div className="app">
<Paper square style={{ width: 500 }}>
        <Tabs
          value={this.state.valueTabs}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="primary"
          textColor="secondary"
          default="0"
        >
          <Tab icon={<MovieIcon />} label="Movies" onClick={()=>{history.push('/')}}/>
          <Tab icon={<TvIcon/>}  label="TV Shows" onClick={()=>{history.push('/tvShows')}} />
        </Tabs>

      </Paper>
<div style={{ borderTop:'2px solid grey'}}>
      <Typography variant="h4"  style={{marginTop:50, }}align='center' color="inherit">
           Welcome on our Website, please search for any Movie:
         </Typography>
      <div className={classes.search}>
                  <div className={classes.searchIcon} >
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={this.searchMovie}
                  />
                </div>
                {!this.state.isHidden && <TopMovie history={this.props.history} className="snow"/>}
<Grid container align='center'>

      {
Object.keys(movies).map(id=>{
  if(movies[id].poster_path!==null)
  {
  const img="http://image.tmdb.org/t/p/w500"+movies[id].poster_path;
  return<Grid item xs={12} sm={6} key={id}>
  <Card className={classes.card}><CardActionArea onClick={()=>{this.movieDetails(movies[id].id)}}>
    <CardMedia
      component="img"
      alt="Contemplative Reptile"
      className={classes.media}
      height="440"
      image={img}
      title={movies[id].title}
    />
    <CardContent style={{marginTop:20, }}>
      <Typography gutterBottom variant="h4" align='center' component="h2">
        {movies[id].title}

      </Typography>
      <Typography component="p" align='center' style={{fontSize:30}}>
         <StarIcon/>{movies[id].vote_average}/10
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions>
    <Button size="small" style={{marginTop:30, }}color="primary" onClick={()=>{this.movieDetails(movies[id].id)}}>
      Learn More
    </Button>
  </CardActions>
  </Card>

  </Grid>

}
})
      }

      </Grid>
</div>
</div>
    );
  }
}

export default withStyles(styles)(App);
