import React, {Component} from 'react';

class UserForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onUserSubmit(this.state.name);
  }
  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }
  render() {
    return(
      <form className="UserForm__form" onSubmit={e => this.handleSubmit(e)}>
        <input
          className="UserForm__input"
          placeholder='Write your nickname and press enter'
          onChange={e => this.handleChange(e)}
          value={this.state.name}
        />
      </form>
    );
  }
}

export default UserForm