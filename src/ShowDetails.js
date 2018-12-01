import React, {Component} from 'react';
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
    valueTabs:1,
    showDetails:{},
    track:'false'
  }
  handleChange = (event, value) => {
    this.setState({ valueTabs:value });
  };

componentWillMount(){
  const url="https://api.themoviedb.org/3/tv/"+this.props.history.tvId+"?api_key=38a6fb9c67512590950aabe3f677f0ac";
  let details={};
  $.ajax({
    url:url,
    success:(response)=>{
    Object.keys(response).map(property=>{
    details[property]=response[property];
    })
    this.setState({showDetails:details});
    },
    error:(xhr,status,err)=>{
      console.log(err);
    }
  })

}

    render() {

      const { classes, history } =this.props;
      const img="http://image.tmdb.org/t/p/w500"+this.state.showDetails.poster_path;
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
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="540"
                image={img}
              />
              <CardContent style={{marginTop:20, }}>
                <Typography gutterBottom variant="h5" align='center' component="h5">
                  {this.state.showDetails.overview}

                </Typography>
                <Typography component="p" align='center' style={{fontSize:30}}>
                   <StarIcon/>{this.state.showDetails.vote_average}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" style={{marginTop:30, border:'2px solid grey', padding:10, backgroundColor:'grey', color:'white', fontSize:'bold'}} onClick={()=>{history.push('/tvShows')}}>
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
