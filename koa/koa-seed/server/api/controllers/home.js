
exports.index = async (ctx, next) => {
  await ctx.render('index', {
    name: '重庆交控'
  })
}

exports.demo = async (ctx, next) => {
  await ctx.render('demo', {
    name: 'This is Demo page!'
  })
}

exports.getDemoRequest = async (ctx, next) => {
  return ctx.body = {
    errcode: 0,
    msg: null,
    datas: 'get 哈哈哈'
  }
}

exports.postDemoRequest = async (ctx, next) => {

  console.log(ctx.request.body)

  return ctx.body = {
    errcode: 0,
    msg: null,
    datas: 'post 哈哈哈'
  }
}

exports.postDemoFile = async (ctx, next) => {

  console.log(ctx.req.files)

  return ctx.body = {
    errcode: 0,
    msg: null,
    datas: 'post file 哈哈哈'
  }
}