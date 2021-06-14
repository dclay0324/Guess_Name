import React, { Component } from 'react';
import { Button, Form, Message, Input, Dropdown } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import Layout from '../components/Layout';
import firebase from 'firebase';
import config from '../components/config';

class Index extends Component {
  static async getInitialProps(props) {
    const { player } = props.query;
    let playerNameList = [];
    let playerIDList = [];
    let i = 0;

    if (!firebase.apps.length) 
      firebase.initializeApp(config);

    await firebase.database().ref("namePool").once('value').then(async function (snapshot) {
      for (let item in snapshot.val()) {
          // console.log(item);
          await firebase.database().ref("namePool/" + item).once('value').then(function (snapshot) {
              if (snapshot.val().playerID != player) {
                playerNameList[i] = { key: i, text: snapshot.val().playerName, value: i };
                playerIDList[i] = { key: i, text: snapshot.val().playerID, value: i }
                i++;
              }
          });
      }
    });

    // console.log(playerNameList);
    
    return { player, playerNameList, playerIDList };
  }

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      id: '',
      guessName: '',
      errorMessage: '',
      loading: false,
      loading_list: false,
      disabled: false,
      disabled_start: true
    }
  }

  handleChange = async (e, { value }) => {
    this.setState({ 
      name: this.props.playerNameList[value].text, 
      id: this.props.playerIDList[value].text
    });
    // console.log(this.state.name);
  }

  onSubmit = async () => {
    this.setState({ 
      loading: true, 
      errorMessage: ''
    });

    try {
      if (!firebase.apps.length) 
        firebase.initializeApp(config);

      var path = this.state.id;
      await firebase.database().ref(`namePool/${path}`).update({ 
        guessName: this.state.guessName 
      })
      .then(function () {
        alert("建立成功")
      }).catch(function () {
        alert("建立失敗");
      });

      // Router.pushRoute(`/login`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ 
      loading: false,
      disabled: true,
      disabled_start: false });
  };

  render() {
    return (
      <Layout>
        <h1>Set Name</h1>
        <br />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <h3>Player Name</h3>
            <Dropdown
              placeholder='the player name'
              options={this.props.playerNameList}
              selection={true}
              loading={this.state.loading_list}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <h3>Guess Name</h3>
            <Input
              placeholder='the guess name'
              value={this.state.guessName}
              onChange={event =>
                this.setState({ guessName: event.target.value })}
            />
          </Form.Field>
          <a>
            <Button
              disabled={this.state.disabled}
              loading={this.state.loading}
              content='Set'
              icon='download'
              primary={true}
            />
          </a>
          <Link route={`/play/${this.props.player}`}>
          <a>
            <Button
              disabled={this.state.disabled_start}
              content='Start'
              icon='play'
              primary={true}
            />
          </a>
        </Link>
          <Message error header="Oops!" content={this.state.errorMessage} />
        </Form>
        <br /><br />
      </Layout>
    );
  }
}

export default Index;