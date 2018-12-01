import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import $ from 'jquery';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/StarRate';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router'


const styles = theme => ({
  card: {
    marginTop:50,
   minWidth: 465,
   minHeight:400,
   display:'inline-block',
   backgroundColor:'grey',
   color:'white'
 },
})

class App extends Component{
  state={
 movies:{},
  };

  movieDetails=(id)=>{
    const {history}=this.props;

    history.movieId=id;
    history.push('/MovieDetails');
  }
componentWillMount(){
  var url="https://api.themoviedb.org/3/movie/top_rated?api_key=38a6fb9c67512590950aabe3f677f0ac";
  var i=0;
  var obj={};
 $.ajax({
   url:url,
   success:(response)=>{
     response.results.forEach((movie,index)=>{
       if(i>9){
       return;
     }
     obj[index]=movie;
     i++;
     })
     this.setState({movies:obj})
   },
   error:(xhr, status, err)=>{
     console.log(err);
   }
 })
}

  render(){
    const {classes, history}=this.props;
    let {movies}=this.state;

return (

<div>
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
                  />
                <CardContent style={{marginTop:20, color:'white'}}>
                  <Typography gutterBottom variant="h4" align='center'  component="h2" style={{color:'white'}}>
                    {movies[id].title}

                  </Typography>
                <Typography component="p" align='center' style={{fontSize:30,color:'white'}}>
                  <StarIcon/>{movies[id].vote_average}/10
                </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" style={{marginTop:30, color:'white' }} onClick={()=>{this.movieDetails(movies[id].id)}}>
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
);
  }
}

export default withStyles(styles)(App);
