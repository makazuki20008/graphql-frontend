import React from "react";
import "./ListMovies.css";
import InfiniteLoadComponent from "./InfiniteLoadComponent";

class ListMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: "",
      total: "",
      page: "",
      totalPage: "",

      countShow: true,
      totalShow: true,
      pageShow: true,
      totalPageShow: true,
    };
  }

  componentDidMount() {
    this.graphqlMovies();
  }
  
  graphqlMovies() {
    var query = `{
          nowPlaying {
            count,
            total,
            page,
            totalPage
          }
        }`;

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
      .then((data) => {
        this.setState({
          count: data.data.nowPlaying.count,
          total: data.data.nowPlaying.total,
          page: data.data.nowPlaying.page,
          totalPage: data.data.nowPlaying.totalPage,
        });
      });
  }

  changeBTNCountColor() {
    this.setState({ countShow: !this.state.countShow });
  }
  changeBTNTotalColor() {
    this.setState({ totalShow: !this.state.totalShow });
  }
  changeBTNPageColor() {
    this.setState({ pageShow: !this.state.pageShow });
  }
  changeBTNTotalPageColor() {
    this.setState({ totalPageShow: !this.state.totalPageShow });
  }
  render() {
    let btn_count_class = this.state.countShow ? "blackButton" : "whiteButton";
    let btn_total_class = this.state.totalShow ? "blackButton" : "whiteButton";
    let btn_page_class = this.state.pageShow ? "blackButton" : "whiteButton";
    let btn_totalpage_class = this.state.totalPageShow ? "blackButton" : "whiteButton";

    return (
      <div>
        <h1>List movies</h1>

        <button
          className={btn_count_class}
          onClick={this.changeBTNCountColor.bind(this)}
        >
          count
        </button>
        <button
          className={btn_total_class}
          onClick={this.changeBTNTotalColor.bind(this)}
        >
          total
        </button>
        <button
          className={btn_page_class}
          onClick={this.changeBTNPageColor.bind(this)}
        >
          page
        </button>
        <button
          className={btn_totalpage_class}
          onClick={this.changeBTNTotalPageColor.bind(this)}
        >
          totalPage
        </button>

        <div class="movies">
          {this.state.countShow && <span>Count: {this.state.count}</span>}
          {this.state.totalShow && <span>Total: {this.state.total}</span>}
          {this.state.pageShow && <span>Page: {this.state.page}</span>}
          {this.state.totalPageShow && (
            <span>Total Page: {this.state.totalPage}</span>
          )}
        </div>

        <InfiniteLoadComponent></InfiniteLoadComponent>
      </div>
    );
  }
}

export default ListMovies;
