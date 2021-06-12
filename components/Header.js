import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Menu.Menu position="left">
        <Link route="/">
          <a className="item">Guess Name</a>
        </Link>
      </Menu.Menu>

      <Link route="/login">
        <a className="item">Login</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/list">
          <a className="item">Check All</a>
        </Link>
      </Menu.Menu>
    </Menu>
  )
}