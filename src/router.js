import * as React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route, Redirect } from 'react-router';
import { Router } from 'react-router-dom';
// import { observer, inject } from 'mobx-react';
import history from './component/History';
import BasicLayout from './component/BasicLayout';


const TestScreen = Loadable({
  loader: () => import('./container/Test/Test'),
  loading: () => (<p>loading...</p>),
});

const ExperienceScreen = Loadable({
  loader: () => import('./container/Experience/Experience'),
  loading: () => (<p>loading...</p>),
});

const LocationScreen = Loadable({
  loader: () => import('./container/Loaction/Location'),
  loading: () => (<p>loading...</p>),
});


class AppRouter extends React.Component {
  constructor(props) {
    super();
    console.log(props);
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <BasicLayout>
            <Route exact path="/experience" component={ExperienceScreen} />
            <Route exact path="/location" component={LocationScreen} />
            <Redirect to="/experience" />
          </BasicLayout>
        </Switch>
      </Router>
      
    );
  }
}

export default AppRouter;
