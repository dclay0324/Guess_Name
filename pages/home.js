// import React, { Component } from 'react';
// import { Card, Grid, Button } from 'semantic-ui-react';
// import Layout from '../components/Layout';
// import ContributeForm from '../components/ContributeForm';
// import { Link } from '../routes';

// class CampaignShow extends Component {
//   static async getInitialProps(props) {
//     let summary = [0, 1, 2, 3, 4];
//     return {
//       address: props.query.address,
//       minimumContribution: summary[0],
//       balance: summary[1],
//       requestsCount: summary[2],
//       approversCount: summary[3],
//       manager: summary[4]
//     };
//   }

//   renderCards() {
//     const {
//       balance,
//       manager,
//       minimumContribution,
//       requestsCount,
//       approversCount
//     } = this.props;

//     const items = [
//       {
//         header: manager,
//         meta: 'Address of Manager',
//         description:
//           'The manager created this campaign and can create requests to withdraw money',
//         style: { overflowWrap: 'break-word' }
//       },
//       {
//         header: minimumContribution,
//         meta: 'Minimum Contribution (wei)',
//         description:
//           'You must contribute at least this much wei to become an approver'
//       },
//       {
//         header: requestsCount,
//         meta: 'Number of Requests',
//         description:
//           'A request tries to withdraw money from the contract. Requests must be approved by approvers'
//       },
//       {
//         header: approversCount,
//         meta: 'Number of Approvers',
//         description:
//           'Number of people who have already donated to this campaign'
//       },
//       {
//         header: approversCount,
//         meta: 'Campaign Balance (ether)',
//         description:
//           'The balance is how much money this campaign has left to spend.'
//       }
//     ];

//     return <Card.Group items={items} />;
//   }

//   render() {
//     return (
//       <Layout>
//         <h3>Campaign Show</h3>
//         <Grid>
//           <Grid.Row>
//             <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

//             <Grid.Column width={6}>
//               <ContributeForm address={this.props.address} />
//             </Grid.Column>
//           </Grid.Row>

//           <Grid.Row>
//             <Grid.Column>
//               <Link route={`/campaigns/${this.props.address}/requests`}>
//                 <a>
//                   <Button primary>View Requests</Button>
//                 </a>
//               </Link>
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//       </Layout>
//     );
//   }
// }

// export default CampaignShow;
import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = [0, 1, 2, 3, 4];

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>

          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
