const Koa = require('koa');
const app = new Koa();

const logger = require('koa-logger');
const onerror = require('koa-onerror');
const render = require('koa-ejs');
const path = require('path');

// 错误处理
onerror(app);

// 模板
render(app, {
  root: path.join(__dirname, './views'),
  layout: 'common/layout',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(require('koa-bodyparser')());

// 日志
app.use(logger());

// 静态资源
app.use(require('koa-static')(__dirname + '/public'));

const router = require('koa-router')();
var routes = require('./server/api/routes');
app.use(router.routes());
routes(router);

module.exports = app;
