import React, { Component } from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Row from '../components/Row';
import { Link } from '../routes';
import firebase from 'firebase';
import config from '../components/config';

class List extends Component {
  static async getInitialProps(props) {
    const { player } =  props.query;
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

                if (arr[0] != player) 
                  playerList.push(arr);   
            });
        }
    });

    return { playerList, player };
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