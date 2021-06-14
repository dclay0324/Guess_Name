import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import Layout from '../components/Layout';

class Quit extends Component {
  render() {
    return (
      <Layout>
        <br /><br /><br /><br /><br /><br />
        <Container textAlign='center'>
          <h1 style={{ color: "#e60000" }}><font size="50">！再見，拉基！</font></h1>
        </Container>
      </Layout>
    );
  }
}

export default Quit;