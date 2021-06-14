import React, { Component } from 'react';
import { Button, Form, Message, Input, Divider } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import Layout from '../components/Layout';
import firebase from 'firebase';
import config from '../components/config';

class Random extends Component {
  static async getInitialProps(props) {
    const { player } = props.query;

    if (!firebase.apps.length) 
      firebase.initializeApp(config);
    
    return { player };
  }

  constructor (props) {
    super(props)
    this.state = {
      guessName: '',
      errorMessage: '',
      loading: false,
      loading_list: false,
      loading_random: false,
      disabled: false,
      disabled_start: true
    }
  }

  handleRandom = async () => {
    this.setState({ loading_random: true });

    if (!firebase.apps.length) 
      firebase.initializeApp(config);

    let i = 0;
    let id_name = new Map();
    let update_map = new Map();
    let ID_list = [];
    let name_list = [];
    var n;

    await firebase.database().ref("namePool").once('value').then(async function (snapshot) {
      for (let item in snapshot.val()) {
        await firebase.database().ref("namePool/" + item).once('value').then(function (snapshot) {
          ID_list[i] = snapshot.val().playerID;
          name_list[i++] = snapshot.val().guessName;
          
          id_name.set(snapshot.val().playerID, snapshot.val().guessName);
        });
      }
    });

    i = 0;
    // console.log("--------------");
    while (i < name_list.length) {
      n = Math.floor(Math.random() * (name_list.length - i));
      while (id_name.get(ID_list[i]) == name_list[n]) {
        n = Math.floor(Math.random() * (name_list.length - i));
        if (name_list.length-i == 1) {
          // restart random
          // console.log("duplicate");
          i = 0;
          update_map = new Map();
          n = Math.floor(Math.random() * (name_list.length - i));
        }
      }
      // console.log(ID_list[i] + " " + name_list[n]);
      update_map.set(ID_list[i++], name_list[n]);
      name_list.push(name_list[n]);
      name_list.splice(n, 1);
    }

    // console.log("FINAL: ");
    for (let [key, value] of update_map) {
      await firebase.database().ref("namePool/" + key).update({
        guessName: value
      });
      // console.log(key + " " + value);
    }
       
    this.setState({ loading_random: false });   
    alert("亂數成功");
  }

  onSubmit = async () => {
    this.setState({ 
      loading: true, 
      errorMessage: ''
    });

    try {
      if (!firebase.apps.length) 
        firebase.initializeApp(config);

      // create a random name pool
      var path = this.props.player;
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
          <Message error header="Oops!" content={this.state.errorMessage} />
        </Form>
        <br />
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
        <a>
          <Button
            loading={this.state.loading_random}
            content='Random'
            icon='random'
            color='green'
            onClick={this.handleRandom}
          />
        </a>
        <br /><br />
        <Divider />
        <h4>Rules: </h4>
        <p>1. 輸入人名</p>
        <p>2. Set</p>
        <p>3. 全部人Set完後，其中一人按Random</p>
        <p>4. Start!</p>
      </Layout>
    );
  }
}

export default Random;