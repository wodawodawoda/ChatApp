import React from 'react';

const UsersList = props => (
  <div className="toggle__wrapper">
    <input id="toggle__list" type="checkbox"/>
    <div className="UsersList__online">
      <p><span>{props.users.length}</span> people online</p>
    </div>
    <section className="App__UsersList UsersList">
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
  </div>
);

export default UsersList;