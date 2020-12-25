import Koa from 'koa';
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const passport = require('koa-passport')
// const koaBody = require('koa-body');
const routing = require('./routes/index');
const formatResponse = require('./middlewares/formatResponse')
const Exception = require('./middlewares/Exception')

//路由权限控制
const koaJwt = require('koa-jwt')

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// error handler
onerror(app)


/* app.use((ctx, next) => {
    return next().catch((err) => {
      
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message,
          
        };
      } else {
        throw err;
      }
    })}) */

// 统一处理结果中间件
app.use(formatResponse())
app.use(Exception)









// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())

app.use(logger())

app.use(require('koa-static')(__dirname + '/public'))


// token验证 及 无需验证的路由
// 可以使用另外一ctx key来表示解码数据，然后就可以通过ctx.state.jwtdata代替\
// ctx.state.user获得解码数据
// key: 'jwtdata'
app.use(koaJwt({secret:'token', key: 'jwtdata'},).unless({
  path:[
      /^\/user\/login/,
      /^\/user\/register/,
      /^\/user\/refreshtoken/
  ]
}))





// 初始化koa-passport
app.use(passport.initialize())
app.use(passport.session())
// koa-passport的配置文件
require('./config/passport')(passport)

// 文件上传
/*app.use(koaBody({
  // 启用文件格式
  multipart:true,
  formidable:{
    // 保留文件扩展名 .jpg .jpeg .png ...
    keepExtensions: true,
    maxFileSize:200*1024*1024 // 设置上传文件大小最大限制，默认2M
  }
}))*/

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// 路由放在中间件之后
routing(app)



module.exports = app
