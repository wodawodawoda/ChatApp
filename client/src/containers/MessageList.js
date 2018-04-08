import React, {Component} from 'react';

const Message = props => (
  <div className="Messages__message">
    <div className="Messages__user">{props.from}</div>
    <div className="Messages__text">{props.text}</div>
  </div>
)

const MessageList = props => (
  <div className="Messages__list">
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