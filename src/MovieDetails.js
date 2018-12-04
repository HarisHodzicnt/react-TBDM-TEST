import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import StarIcon from '@material-ui/icons/StarRate';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import { Player } from 'video-react';
import { withRouter } from 'react-router';

const styles = theme => ({

  card: {
    marginTop:50,
   maxWidth: 650,
   minHeight:400,
   display:'inline-block'

 },

})
class App extends Component {
  state={
    valueTabs:0,
    movieDetails:{
      prop:'empty'
    },
  }
  handleChange = (event, value) => {
    this.setState({ valueTabs:value });
  };

componentWillMount(){
  const url="https://api.themoviedb.org/3/movie/"+this.props.history.movieId+"?api_key=38a6fb9c67512590950aabe3f677f0ac&append_to_response=videos";
  let details={};
  $.ajax({
    url:url,
    success:(response)=>{
    Object.keys(response).map(property=>{
    details[property]=response[property];
    })
    this.setState({movieDetails:details});
    },
    error:(xhr,status,err)=>{
      console.log(err);
    }
  })

}

    render() {
      const { classes, history } =this.props;
      let img="https://image.tmdb.org/t/p/w500"+this.state.movieDetails.poster_path;
    /*  if(this.state.movieDetails.prop!=='empty')
      {
        this.state.movieDetails.videos.results.forEach((value)=>{
          if(value.type=='Trailer')
          {
            img="http://www.youtube.com/embed/"+value.key;
            return;
          }
        })
      }
in case Iframe start working ...

*/
/*  <CardMedia
          component="iframe"
          alt="Contemplative Reptile"
          className={classes.media}
          height="540"
          src={img}
        />

I DONT KNOW WHY, BUT IFRAME WONT LOAD ON MY https://rubicontest-9250a.firebaseapp.com, BUT IT DOES IN LOCALHOST ..., thats why i comment this
        */
return(
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
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', borderTop:'2px solid grey'}}>
            <Card className={classes.card}><CardActionArea >
				{
					console.log(img)
				}

        <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  height="540"
                  image={img}
                />

              <CardContent style={{marginTop:20, }}>
                <Typography gutterBottom variant="h5" align='center' component="h5">
                  {this.state.movieDetails.overview}

                </Typography>
                <Typography component="p" align='center' style={{fontSize:30}}>
                   <StarIcon/>{this.state.movieDetails.vote_average}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" style={{marginTop:30, border:'2px solid grey', padding:10, backgroundColor:'grey', color:'white', fontSize:'bold'}} onClick={()=>{history.push('/')}}>
              {"<< Back"}
              </Button>
            </CardActions>
            </Card>
</div>
            </div>
)
    }

}
export default withStyles(styles)(App);
