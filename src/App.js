import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

var FontAwesome = require("react-fontawesome");

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Board />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img className="logo" src={require("./freeCodeCamp.jpg")} />
      </div>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      recent: [],
      allOrdered: true
    };
  }
  componentDidMount() {
    this.fetchAllTimers();
    this.fetchRecent();
  }
  fetchAllTimers = () => {
    axios
      .get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
      .then(response => {
        console.log(response.data);
        this.setState({
          all: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  fetchRecent = () => {
    axios
      .get("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
      .then(response => {
        console.log(response.data);
        this.setState({
          recent: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  listBoardItems = (x, idx) => {
    return (
      <BoardItem
        name={x.username}
        key={idx}
        no={idx + 1}
        img={x.img}
        rec={x.recent}
        all={x.alltime}
      />
    );
  };
  activateRecent = () => {
    this.setState({
      allOrdered: false
    });
  };
  activateAlltime = () => {
    this.setState({
      allOrdered: true
    });
  };

  render() {
    const renderList = this.state.allOrdered
      ? this.state.all.map(this.listBoardItems)
      : this.state.recent.map(this.listBoardItems);
    const renderHeaderRecent = this.state.allOrdered ? (
      <th onClick={this.activateRecent} className="action">
        Recent points
      </th>
    ) : (
      <th onClick={this.activateRecent} className="action">
        {"Recent points   "}
        <FontAwesome size="2x" className="desc" name="sort-desc" />
      </th>
    );
    const renderHeaderAll = this.state.allOrdered ? (
      <th onClick={this.activateAlltime} className="action">
        {"All time points  "}
        <FontAwesome size="2x" className="desc" name="sort-desc" />
      </th>
    ) : (
      <th onClick={this.activateAlltime} className="action">
        All time points
      </th>
    );
    return (
      <div className="Board">
        <table>
          <tbody>
            <tr>
              <th colSpan="4">Leaderboard</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              {renderHeaderRecent}
              {renderHeaderAll}
            </tr>
            {renderList}
          </tbody>
        </table>
      </div>
    );
  }
}

class BoardItem extends Component {
  render() {
    return (
      <tr className="BoardItem">
        <td>{this.props.no}</td>
        <td className="namecell">
          <img src={this.props.img} />
          {"  " + this.props.name}
        </td>
        <td>{this.props.rec}</td>
        <td>{this.props.all}</td>
      </tr>
    );
  }
}

export default App;
