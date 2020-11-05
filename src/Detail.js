import React from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import backImg from './back.png';
import './Detail.css';

const BoxDetail = () => {
 let { id } = useParams();

 return (
    <div>
        <Detail id={id}></Detail>
    </div>
  );
};

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      original_title: '',
      original_language: '',
      overview: '',
      video: '',
      poster_path: '',
      backdrop_path: '',
      popularity: '',
      adult: '',
      vote_count: '',
      vote_average: '',
      release_date: ''
    }
  }

  componentDidMount() {
    this.loadMovie();
  }

  loadMovie() {
  var query = `{
  details(movieId: ${this.props.id}) {
      id
      title
      original_title
      original_language
      overview
      video
      poster_path
      backdrop_path
      popularity
      adult
      vote_count
      vote_average
      release_date
    }
  }`;

  fetch('https://ion-movies.herokuapp.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
    })
  })
    .then(r => r.json())
    .then(data => { 
                      this.setState({
                        id: data.data.details.id, 
                        title: data.data.details.title,
                        original_title: data.data.details.original_title,
                        original_language: data.data.details.original_language,
                        overview: data.data.details.overview,
                        video: data.data.details.video,
                        poster_path: data.data.details.poster_path,
                        backdrop_path: data.data.details.backdrop_path,
                        popularity: data.data.details.popularity,
                        adult: data.data.details.adult,
                        vote_count: data.data.details.vote_count,
                        vote_average: data.data.details.vote_average,
                        release_date: data.data.details.release_date,
                      });
                  });
                }

  render() {
    return(
      <div class="detail-contain">
        <Link to="/"><img class="back" src={backImg} alt="button_back"/></Link>
        <div class="posterImg-contain">
          <img class="posterImg" src={this.state.poster_path} alt={this.state.title}/>
        </div>
        {this.state.id && 
        <div>
          <p><b>Id:</b> {this.state.id}</p>
          <p><b>Title:</b> {this.state.title}</p>
          <p><b>Original Title:</b> {this.state.original_title}</p>
          <p><b>Original Language:</b> {this.state.original_language}</p>
          <p><b>Overview:</b> {this.state.overview}</p>
          <p><b>Video:</b> {this.state.video.toString()}</p>
          <p><b>Poster Path:</b> {this.state.poster_path}</p>
          <p><b>Backdrop Path:</b> {this.state.backdrop_path}</p>
          <p><b>Popularity:</b> {this.state.popularity}</p>
          <p><b>Adult:</b> {this.state.adult.toString()}</p>
          <p><b>Vote Count:</b> {this.state.vote_count}</p>
          <p><b>Vote Average:</b> {this.state.vote_average}</p>
          <p><b>Release Date:</b> {this.state.release_date}</p>
        </div>
        }
        
    </div>
    )
  }
}

export default BoxDetail;