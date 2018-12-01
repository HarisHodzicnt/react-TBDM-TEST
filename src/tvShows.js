import React, { Component} from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import StarIcon from '@material-ui/icons/StarRate';
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
import TopShow from './TopShow';
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
    valueTabs:1,
    shows:{},
    isHidden: false,
    text:'',
  }
  searchTvShows=(text)=>{
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
          const url="https://api.themoviedb.org/3/search/tv?api_key=38a6fb9c67512590950aabe3f677f0ac&query="+text;
          $.ajax({
            url:url,
            success:(response)=>{
              response.results.forEach((show,index)=>{
                obj[index]=show;
                this.setState({shows:obj})
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
componentWillMount(){
  this.searchTvShows(sessionStorage.getItem('text'));
}
componentDidMount(){
  sessionStorage.setItem('text',"");

}
  handleChange = (event, value) => {
    this.setState({ valueTabs:value });
    sessionStorage.setItem('text', "");

  };

showDetails=(id)=>{
  const {history}=this.props;
  history.tvId=id;
  sessionStorage.setItem('text', this.state.text);
  history.push('/ShowDetails');
}

render() {
  const { classes, history } =this.props;
  const {shows}=this.state;
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
         Welcome on our Website, please search for any Tv Show:
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
                  onChange={this.searchTvShows}
                />
              </div>
              {!this.state.isHidden && <TopShow history={this.props.history} className="snow"/>}
<Grid container align='center'>

    {
Object.keys(shows).map(id=>{
if(shows[id].poster_path!==null)
{
const img="http://image.tmdb.org/t/p/w500"+shows[id].poster_path;
return<Grid item xs={12} sm={6} key={id}>
<Card className={classes.card}><CardActionArea onClick={()=>{this.showDetails(shows[id].id)}}>
  <CardMedia
    component="img"
    alt="Contemplative Reptile"
    className={classes.media}
    height="440"
    image={img}
    title={shows[id].name}
  />
  <CardContent style={{marginTop:20, }}>
    <Typography gutterBottom variant="h4" align='center' component="h2" style={{ color:'white'}}>
      {shows[id].name}

    </Typography>
    <Typography component="p" align='center' style={{fontSize:30,  color:'white'}}>
       <StarIcon/>{shows[id].vote_average}/10
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="small" style={{marginTop:30, color:'white' }}onClick={()=>{this.showDetails(shows[id].id)}}>
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
