import React, { Component } from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Row from '../components/Row';
import { Link } from '../routes';
import firebase from 'firebase';
import config from '../components/config';

class List extends Component {
  static async getInitialProps(props) {
    
    var playerList = [];

    if (!firebase.apps.length) 
        firebase.initializeApp(config);

    await firebase.database().ref("namePool").once('value').then(async function (snapshot) {
        for (let item in snapshot.val()) {
            // console.log(item);
            await firebase.database().ref("namePool/" + item).once('value').then(function (snapshot) {
                let arr = [];
                arr[0] = snapshot.val().playerName;
                arr[1] = snapshot.val().guessName;

                playerList.push(arr);
                console.log(arr);
            });
        }
    });

    return { playerList };
  }

  renderRows() {
    return this.props.playerList.map((player, index) => {
      return (
        <Row 
          key={index}
          player={player}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h1>All guess names</h1>
        <Link route={`/`}>
          <a>back</a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>Player&ensp;Name</HeaderCell>
              <HeaderCell>Guess&ensp;Name</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
      </Layout>
    );
  }
}

export default List;