import logo from './logo.svg';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, Query} from 'react-apollo'
import gql from 'graphql-tag'
import './App.css';


// Connecting to the Subgraph I have deployed for YFV
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/redallica/yfv'
});

// Writing our query 
const TOKENHOLDERS_SUBGRAPH_QUERY = gql `
  {
    tokenHolders {
      id
      address
      balance
   }
 }
`;

// Apollo Provider attached the client to the React app
function App() {
  return (
  <ApolloProvider client = {client}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Query query = {TOKENHOLDERS_SUBGRAPH_QUERY}>
           {({loading, data}) => {
             if (loading) return 'LOADING ...';
             const {tokenholders} = data;
             return tokenholders.map(tokenholder => <h1>{tokenholder.title}</h1>)
           }}
        </Query>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  </ApolloProvider>
  );
}

export default App;
