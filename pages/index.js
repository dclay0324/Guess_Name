import React, { Component } from 'react';
import { Button, Form, Message, Input, Dropdown } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import Layout from '../components/Layout';
import firebase from 'firebase';
import config from '../components/config';

class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      errorMessage: '',
      loading: false,
      disabled: true
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
        guessName: this.state.name
      })
      .then(function () {
        alert("登入成功")
      }).catch(function () {
        alert("登入失敗");
      });

      // await Router.pushRoute(`/setup/${ this.state.name.toString() }`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ 
      loading: false,
      disabled: false });
  };

  render() {
    return (
      <Layout>
        <h1>Login</h1>
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

          <a>
            <Button
              loading={this.state.loading}
              content='Login'
              icon='sign-in'
              primary={true}
            />
          </a>
          <Link route={`/setup/${this.state.name}`}>
            <a>
              <Button
                disabled={this.state.disabled}
                content='Set Name'
                icon='edit'
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

export default Login;