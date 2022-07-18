import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./components/Router";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const link = new HttpLink({
  uri: "https://facebook-ad.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_AS,
  },
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

Sentry.init({
  dsn: "https://5c008fad506a439d82ac9d9971b6c18e@o1323221.ingest.sentry.io/6580744",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
