import dva from 'dva';
import { useRouterHistory, browserHistory } from 'dva/router';
import createLoading from 'dva-loading';

import './utils/globalFunction';
import './index.less';

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error) {
    console.error('app onError -- ', error);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/apps'));
app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
