import React, { Component } from 'react';
import { Button, Form, Message, Input, Dropdown } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import Layout from '../components/Layout';
import firebase from 'firebase';
import config from '../components/config';

class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      guessName: '',
      errorMessage: '',
      loading: false
    }
  }

  onSubmit = async () => {
    this.setState({ 
      loading: true, 
      errorMessage: ''
    });

    try {
      if (!firebase.apps.length) 
        firebase.initializeApp(config);

        var path = this.state.name;
        await firebase.database().ref(`namePool/${path}`).set({
          playerName: this.state.name,
          guessName: this.state.guessName
        })
        .then(function () {
          alert("建立成功")
        }).catch(function () {
          alert("建立失敗");
        });

      Router.pushRoute(`/login`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h1>Set Name</h1>
        <br />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <h3>Player Name</h3>
            <Input
              placeholder='the player name'
              value={this.state.name}
              onChange={event =>
                this.setState({ name: event.target.value })}
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
              loading={this.state.loading}
              content='Set'
              icon='upload'
              primary={true}
            />
          </a>
          <Message error header="Oops!" content={this.state.errorMessage} />
        </Form>
        <br /><br />
      </Layout>
    );
  }
}

export default Index;