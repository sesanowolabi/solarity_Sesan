import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
// import './css/main.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';

import mixpanel from 'mixpanel-browser';
import { MixpanelProvider } from 'react-mixpanel';

mixpanel.init("d96d9f1409ced72777048f912ef7591e");

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });


// Get the preview token from the URL
let m = document.location.href.match(/\btoken=([^&]+)/);
let token = m ? m[1] : '';

// Then forward that on whenever you are sending a CraftQL API request
let url = `graph-api?token=${token}`;
// ...

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BASE_URL}${url}`,
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_GRAPH_TOKEN}`,
      },
    });
  },
  cache:cache,
});

ReactDOM.render(
	<ApolloProvider client={client}>
    <MixpanelProvider mixpanel={mixpanel}>
		  <App />
    </MixpanelProvider>
	</ApolloProvider>,
	document.getElementById('root'));
registerServiceWorker();
