import React, { Component } from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Row from '../components/Row';
import { Link, Router } from '../routes';
import firebase from 'firebase';
import config from '../components/config';

class Play extends Component {
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

  constructor (props) {
    super(props)
    this.state = {
      loading_ans: false,
      loading_quit: false
    }
  }

  handleAns = async () => {
    this.setState({ loading_ans: true });
    await firebase.database().ref("namePool/" + this.props.player).once('value').then(function (snapshot) {
      alert("Your answer is " + snapshot.val().guessName);
    });
    this.setState({ loading_ans: false });
  }

  handleQuit = async () => {
    this.setState({ loading_quit: true });
    await firebase.database().ref("namePool/" + this.props.player).remove();
    this.setState({ loading_quit: false });
    Router.pushRoute(`/quit`);
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
        <h1>Guess Names</h1>
        <br />
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
        <a>
          <Button
            loading={this.state.loading_ans}
            content='Answer'
            icon='eye'
            primary={true}
            onClick={this.handleAns}
          />
        </a>
        <Link route={`/setup/${this.props.player}`}>
          <a>
            <Button
              content='Next Game'
              icon='redo'
              primary={true}
            />
          </a>
        </Link>
        <Link route={`/quit`}>
          <a>
            <Button
              loading={this.state.loading_quit}
              content='Quit Game'
              icon='sign-out'
              primary={true}
              onClick={this.handleQuit}
            />
          </a>
        </Link>
      </Layout>
    );
  }
}

export default Play;