import React, {Component} from 'react';
import io from 'socket.io-client';


import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('http://localhost:5000')

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
    	objectText: '',
    	response: '',
      users: [],
      messages: [],
      text: '',
      name: ''
    };
  }
  componentDidMount() {
  	this.callApi('/api/hello')
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
    this.callApi('/api/object')
      .then(res => this.setState({ objectText: res.text }))
      .catch(err => console.log(err));
    socket.on('test', data => console.log(data, ' :socket data test'));
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({users}) => this.chatUpdate(users));
  }

  callApi = async (url) => {
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
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
          <h1 className="App__title">ChatApp</h1>
          <h2 className="App__room">App room</h2>
        </header>
        <main className="App__body">
          <UsersList
            users={this.state.users}
          />
          <section className="App__Message">
            <MessageList
              messages={this.state.messages}
            />
            <MessageForm
              onMessageSubmit={message => this.handleMessageSubmit(message)}
              name={this.state.name}
            />
          </section>
        </main>
        <h2>fetched data</h2>
      	<p>Hello from /api/hello: {this.state.response}</p>
     	<p>Text from /api/object: {this.state.objectText}</p>
      </div>
    );
  }
  renderUserForm() {
    return (
      <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />
    );
  }
}

export default App;