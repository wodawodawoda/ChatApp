import React, {Component} from 'react';

const Message = props => (
  <div className="MessageList__message">
    <strong>{props.from}</strong>
    <span>{props.text}</span>
  </div>
)

const MessageList = props => (
  <div className="MessageList">
    {props.messages.map((message, idx) => {
      return(
        <Message
          key={idx}
          from={message.from}
          text={message.text}
        />
      );
    })}
  </div>
);

export default MessageList