import React, { Component } from 'react';
import { Button, Form, Message, Input, Dropdown } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import Layout from '../components/Layout';

class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
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
      await Router.pushRoute(`/play/${ this.state.name.toString() }`);
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
              content='Start'
              icon='play'
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

export default Login;