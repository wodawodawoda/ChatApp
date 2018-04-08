import React, {Component} from 'react';

const UsersList = props => (
  <section className="UsersList">
    <div className="UsersList__online">
      <p><span>{props.users.length}</span> people online</p>
    </div>
    <ul className="UsersList__users">
      {props.users.map(user => {
        return(
          <li key={user.id} className="UsersList__user">
            {user.name}
          </li>
        );
      })}
    </ul>
  </section>
);

export default UsersList