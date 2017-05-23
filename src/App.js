import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './skeleton.css';
import './normalize.css';

const data = [
  {
    name: "Wired",
    link: "https://wired.com",
    currentBoats: 10
  },
  {
    name: "TechCrunch",
    link: "https://techcrunch.com",
    currentBoats: 49
  }
]

const styles = {
  display: 'inline-block'
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const list = data.map((post) => {
        return ( 
          <Post name={post.name} link={post.link} boats={post.currentBoats}></Post>
        );  
    });
    return (
      <div className="entry-point container">
          <div className="title">
            <h3 style={styles}>Roddit</h3><h5 style={styles}>Reddit on React</h5>
          </div>
          {list}
      </div>
    );
  }
}

class Post extends Component {
    render() {
      return (
          <div className="post row">
            <div className="two columns">
              <Doot currentBoats={this.props.boats}></Doot>
            </div>
            <div className="ten columns">
              <Link name={this.props.name} link={this.props.link}></Link>
            </div>
          </div>
      );
    }
}

class Link extends Component {
  render() {
    return (
      <div className="link">
        <a href={this.props.link}>{this.props.name}</a>
      </div>
    )
  }
}

class Doot extends Component {
  constructor(props) {
    super(props);
    this.submitDoot = this.submitDoot.bind(this);
    this.adjustBoats = this.adjustBoats.bind(this);
    this.state = {doot: "no-doot", currentBoats: this.props.currentBoats};
  }

  submitDoot(e) {
    this.setState({doot: this.adjustDoot(e.target.value), currentBoats:  this.adjustBoats(e.target.value)});

    //Create redux store that returns the value of e to server
  }

  adjustDoot(voteStatus) {
    if (this.state.doot === "up" && voteStatus === "up") {
      return "no-doot";
    }

    if (this.state.doot === "down" && voteStatus === "down") {
      return "no-doot";
    }

    else return voteStatus;
  }

  adjustBoats(status) {
    if (this.state.doot === "no-doot") {
        if (status === "up") {
          return this.state.currentBoats + 1;
        }

      else if (status === "down") {
        return this.state.currentBoats - 1
      }
    }

    else if (this.state.doot === "up") {
      if (status === "down") {
        return this.state.currentBoats - 2;
      }

      else if (status === "up") {
        return this.state.currentBoats - 1;
      }
    }

    else if (this.state.doot === "down") {
      if (status === "up") {
        return this.state.currentBoats + 2;
      }

      else if (this.state.doot === "down" && status === "down") {
        return this.state.currentBoats + 1;
      }
    }

    return this.state.currentBoats;
  }
  

  render() {
    return (
      <div className="doots">
        <div className="up">
          <Button status="up" active={(this.state.doot === "up")} activeColor={"red"} submitDoot={this.submitDoot}>Up</Button>
        </div>
        <div className="boats">
          {this.state.currentBoats}
        </div>
        <div className="downdoot">
          <Button status="down" active={this.state.doot === "down"} activeColor={"blue"} submitDoot={this.submitDoot}>Down</Button>
        </div>
      </div>
    );
  }
}

class Button extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }

  click(e) {
    this.props.submitDoot(e);
  }

  render() {
    let buttonStyles = {
      color: 'black'
    };

    if (this.props.active) {
      buttonStyles = {
        color: this.props.activeColor
      };
    }

    return (
    <button style={buttonStyles} value={this.props.status} onClick={this.click}>
      {this.props.children}
    </button>);
  }  
}

export default App;
