import Koa from 'koa';
import views from 'koa-views';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
//路由权限控制
const koaJwt = require('koa-jwt')

// 统一返回格式
import formatResponse from './middlewares/formatResponse';
import Exception from './middlewares/Exception';
// 路由
import routing from './routes/index';


const app = new Koa()
// const koaBody = require('koa-body');

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
// 可以使用另外一ctx key来表示解码数据，然后就可以通过ctx.state.jwtdata代替
// ctx.state.user获得解码数据
app.use(koaJwt({secret:'token', key: 'jwtdata'},).unless({
  path:[
      /^\/user\/login/,
      /^\/user\/wxlogin/,
      /^\/user\/register/,
      /^\/user\/refreshtoken/
  ]
}))


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

export default app;
