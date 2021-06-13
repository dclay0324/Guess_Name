import React, { Component } from 'react';
import { Link, Router } from '../routes';
import Layout from '../components/Layout';

class Quit extends Component {
  render() {
    return (
      <Layout>
        <h1 style={{ color: "#e60000" }}>！再見，拉基！</h1>
      </Layout>
    );
  }
}

export default Quit;