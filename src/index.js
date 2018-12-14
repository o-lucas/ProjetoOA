import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import App from './App';
import Challenge from './Challenge';
import ChallengesList from './ChallengesList';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/desafios/:type/:id" component={Challenge} />
      <Route path="/desafios/:type" component={ChallengesList} />
      <Route path="/desafios">
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
