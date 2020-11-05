import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import "./InfiniteLoadComponents.css";
import backToTop from "./backtotop.png";

export default class InfiniteLoadComponent extends React.Component {
  state = {
    listMovies: [],
    pageLoaded: 1
  };

  componentDidMount() {
    this.fetchFirstData();
  }

  fetchFirstData = () => {
    var query = `{
      nowPlaying {
        movies {
          id,
          title,
          poster_path,
          adult
        }
      }
    }`;

    setTimeout(() => {
      fetch("https://ion-movies.herokuapp.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((r) => r.json())
        .then((e) => {
          this.setState({ listMovies: e.data.nowPlaying.movies });
        });
    }, 1000);
  };

  pageNumber = 2;
  fetchMoreData = () => {
    var query = `{
      nowPlaying(page: ${this.pageNumber}) {
        movies {
          id,
          title,
          poster_path,
          adult
        }
      }
    }`;

    setTimeout(() => {
      fetch("https://ion-movies.herokuapp.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((r) => r.json())
        .then((e) => {
          this.setState({
            listMovies: this.state.listMovies.concat(e.data.nowPlaying.movies),
          });
          this.setState({ pageLoaded: this.pageNumber });
          this.pageNumber++;
        });
    }, 1500);
  };

  render() {
    return (
      <div>
        <div class="page-loaded">Page loaded: {this.state.pageLoaded}</div>
        <img
          class="back-to-top"
          src={backToTop}
          alt="Back to top."
          onClick={() => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }}
        />

        <InfiniteScroll
          dataLength={this.state.listMovies.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={
            <div class="text-loading">
              <h4>Loading...</h4>
            </div>
          }
        >
          {this.state.listMovies.map((x) => {
           
            return (
              <div class="movie-wrap">
                <Link to={"detail/" + x.id}>
                  <img
                    class="poster_image"
                    src={x.poster_path}
                    alt={x.title}
                  />
                  <p>
                    <span>
                      <b>Title:</b>
                      {x.title}
                    </span>
                  </p>
                </Link>
              </div>
            );

          })}
        </InfiniteScroll>
      </div>
    );
  }
}
