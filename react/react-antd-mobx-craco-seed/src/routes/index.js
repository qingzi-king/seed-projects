/*
 * @Descripttion: 
 * @Author: qingzi.wang
 * @Date: 2020-07-27 17:14:02
 */ 
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from '../stores/index';

import asyncComponent from './asyncComponent';

// import App from '../pages/App';
// import ConsoleUnit from '../pages/console/Home';
// import NoMatch from '../pages/common/NoMatch';
// const App = () => import('../pages/App');

/**
 * 异步加载组件（切分之后，当前路由下的样式直接使用（刷新页面）其他路由树下的样式（未import情况下）会有问题，注意需要提取公共样式）
 * */
const App = asyncComponent(() => import('../pages/App'));
const ConsoleUnit = asyncComponent(() => import('../pages/console/Home'));
const NoMatch = asyncComponent(() => import('../pages/common/NoMatch'));

const configRoutes = [
  {
    path: '/',
    exact: true,
    main: App,
  },
  {
    path: ['/console', '/console/:str'],
    exact: true,
    main: ConsoleUnit,
  },
  {
    path: '*',
    exact: true,
    main: NoMatch,
  }
];

const Routes = () => (
  <Provider {...stores}>
    <Router>
      <Switch>
        {
          configRoutes.map((route, index) => {
            return <Route key={index} exact={route.exact} path={route.path} component={route.main} />
          })
        }
      </Switch>
    </Router>
  </Provider>
)

// Routes.propTypes = {
//   text: PropTypes.any
// };

export default Routes;