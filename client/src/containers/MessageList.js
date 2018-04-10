import React, {Component} from 'react';

const Message = props => (
  <div className={props.from === props.name ? 'Messages__message Messages__message--client' : 'Messages__message'}>
    <div className="Messages__user">{props.from}</div>
    <div className="Messages__text">{props.text}</div>
  </div>
)

const MessageList = props => (
  <div className="Messages__list">
    <div className="Messages--padding"></div>
    {props.messages.map((message, idx) => {
      return(
        <Message
          key={idx}
          from={message.from}
          text={message.text}
          name={props.name}
        />
      );
    })}
  </div>
);

export default MessageList