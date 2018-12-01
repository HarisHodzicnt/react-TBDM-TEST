import React, {Component} from 'react';
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
    valueTabs:1,
 shows:{},
  };

  showDetails=(id)=>{
    const {history}=this.props;

    history.tvId=id;
    history.push('/ShowDetails');
  }

componentWillMount(){
  var url="https://api.themoviedb.org/3/tv/top_rated?api_key=38a6fb9c67512590950aabe3f677f0ac";
  var i=0;
  var obj={};
 $.ajax({
   url:url,
   success:(response)=>{
     response.results.forEach((shows,index)=>{
       if(i>9){
       return;
     }
     obj[index]=shows;
     i++;
     })
     this.setState({shows:obj})
   },
   error:(xhr, status, err)=>{
     console.log(err);
   }
 })
}

  render(){
    const {classes, history}=this.props;
    let {shows}=this.state;
return (

<div>
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
                  />
                <CardContent style={{marginTop:20, color:'white'}}>
                  <Typography gutterBottom variant="h4" align='center'  component="h2" style={{color:'white'}}>
                    {shows[id].name}

                  </Typography>
                <Typography component="p" align='center' style={{fontSize:30,color:'white'}}>
                  <StarIcon/>{shows[id].vote_average}/10
                </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" style={{marginTop:30, color:'white' }} onClick={()=>{this.showDetails(shows[id].id)}}>
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
