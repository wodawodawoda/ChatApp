import React, {Component} from 'react';

const UsersList = props => (
  <section className="App__UsersList">
    <div className="UsersList__online">
      <p><span>{props.users.length}</span> people online</p>
    </div>
    <ul className="UsersList__users">
      {props.users.map(user => {
        return(
          <li key={user.id} className={user.name !== props.name ? 'UsersList__user' : 'UsersList__user UsersList__user--client'}>
            {user.name}
          </li>
        );
      })}
    </ul>
  </section>
);

export default UsersList