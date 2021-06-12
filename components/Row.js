import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class Row extends Component {
  render() {
    const { Row, Cell } = Table;
    const { player } = this.props;
    return (
      <Row>
        <Cell>{player[0]}</Cell>
        <Cell>{player[1]}</Cell>
      </Row>
    );
  }
}

export default Row;