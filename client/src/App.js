import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    message: ''
  };

  componentDidMount() {
    this.callApi('/api/hello')
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
    this.callApi('/api/message')
      .then(res => this.setState({ message: res.bobo }))
      .catch(err => console.log(err));
  }

  callApi = async (url) => {
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.response}
        </p>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
