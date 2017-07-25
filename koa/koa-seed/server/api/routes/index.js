'use strict';

const multer  = require('koa-multer');
const upload = multer({
  dest: 'public/uploads/',
  limits: {
    fileSize: 10*1024*1024 // Max file size in bytes (10 MB)
  }
});
// const uploadType = upload.single('file'); // 单文件，里面的参数对应上传时文件(key-value)的key
const uploadType = upload.array('files', 12); // 多文件[接受文件key，文件个数]，里面的参数对应上传时文件(key-value)的key

const home = require('../controllers/home');

module.exports = function routes(app) {

  app.get('/', home.index);
  app.get('/api/demo/request', home.getDemoRequest);
  app.post('/api/demo/request', home.postDemoRequest);
  app.post('/api/demo/file', uploadType, home.postDemoFile)

}