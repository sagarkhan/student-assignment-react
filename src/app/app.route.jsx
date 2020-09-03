import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../hoc/layout/layout';
import NotFound from '../components/404/404';
import { ROUTES } from '../utils/constants';

const HomeContainer = React.lazy(() =>
  import('./routes/home/container/home.container'),
);

const StudentContainer = React.lazy(() =>
  import('./routes/student/container/student.container.jsx'),
);

export default class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.routes = [
      {
        path: ROUTES.HOME,
        component: HomeContainer,
        exact: true,
        index: 0,
      },
      {
        path: ROUTES.STUDENT,
        component: StudentContainer,
        exact: false,
        index: 1
      }
    ];
  }

  renderRoutes() {
    return this.routes.map((route) => {
      const RouteComponent = route.component;
      return (
        <Route
          key={route.index}
          path={route.path}
          render={(props) => <RouteComponent {...this.props} {...props} />}
          exact={route.exact}
        />
      );
    });
  }

  render() {
    return (
      <Layout {...this.props}>
        <Suspense fallback={<div> Loading.. </div>}>
          <Switch>
            {this.renderRoutes()}
            <Route
              render={(props) => <NotFound {...this.props} {...props} />}
            />
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}
