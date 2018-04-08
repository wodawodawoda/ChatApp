import React, {Component} from 'react';

class MessageForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    const message = {
      from: this.props.name,
      text: this.state.text
    };
    this.props.onMessageSubmit(message);
    this.setState({
      text: ''
    });
  }
  handleChange(e) {
    console.log(e.target.value)
    this.setState({
      text: e.target.value
    });
  }
  render() {
    return(
      <form className="MessageForm__form" onSubmit={e => this.handleSubmit(e)}>
        <input
          className="MessageForm__input"
          onChange={e => this.handleChange(e)}
          value={this.state.text}
          placeholder='Message'
        />
      </form>
    );
  }
}

export default MessageForm;