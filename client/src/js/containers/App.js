import React, {Component} from 'react';
import io from 'socket.io-client';
import {hot} from 'react-hot-loader';


import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

import '../../styles/app.sass';

const socket = io('/');

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: '',
    	objectText: '',
    	response: '',
      users: [],
      messages: [],
      text: '',
      name: ''
    };
  }
  componentDidMount() {
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({users}) => this.chatUpdate(users));
  }

  messageReceive(message) {
    const messages = [message, ...this.state.messages];
    this.setState({messages});
  }
  chatUpdate(users) {
    this.setState({users})
  }
  handleMessageSubmit(message) {
    const messages = [message, ...this.state.messages];
    this.setState({messages});
    socket.emit('message', message)
  }
  handleUserSubmit(name) {
    this.setState({name});
    socket.emit('join', name)
  }

  render() {
    return(
      this.state.name !== '' ? this.renderLayout() : this.renderUserForm()
    );
  }

  renderLayout() {
    return (
      <div className="App">
        <header className="App__header">
          <h2 className="App__title">ChatApp</h2>
          <h2 className="App__room">Chat room</h2>
        </header>
        <main className="App__body">
          <UsersList
            users={this.state.users}
            name={this.state.name}
          />
          <section className="App__Messages Messages">
            <MessageList
              messages={this.state.messages}
              name={this.state.name}
            />
            <MessageForm
              onMessageSubmit={message => this.handleMessageSubmit(message)}
              name={this.state.name}
            />
          </section>
        </main>
      </div>
    );
  }
  renderUserForm() {
    return (
      <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />
    );
  }
}

export default hot(module)(App);