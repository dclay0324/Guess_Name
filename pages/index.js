import React, { Component } from 'react';
import { Button, Form, Message, Input, Divider } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import Layout from '../components/Layout';
import firebase from 'firebase';
import config from '../components/config';

class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      id: '',
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
      
      var path = this.state.id;
      await firebase.database().ref(`namePool/${path}`).set({
        playerID: this.state.id,
        playerName: this.state.name,
        guessName: this.state.name
      })
      .then(function () {
        alert("登入成功")
      }).catch(function () {
        alert("登入失敗");
      });

      await Router.pushRoute(`/random/${ this.state.id.toString() }`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h1>Login</h1>
        <br />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <h3>Player ID</h3>
            <Input
              placeholder='player id (english only)'
              value={this.state.id}
              onChange={event =>
                this.setState({ id: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <h3>Player Name</h3>
            <Input
              placeholder='the player name'
              value={this.state.name}
              onChange={event =>
                this.setState({ name: event.target.value })}
            />
          </Form.Field>
          <a>
            <Button
              loading={this.state.loading}
              content='Login'
              icon='sign-in'
              primary={true}
            />
          </a>
          <Message error header="Oops!" content={this.state.errorMessage} />
        </Form>
        <br />
        <Divider />
        <h4>Rules: </h4>
        <p>1. 輸入Player ID (英文)</p>
        <p>2. 輸入暱稱</p>
        <p>3. Login</p>
      </Layout>
    );
  }
}

export default Login;