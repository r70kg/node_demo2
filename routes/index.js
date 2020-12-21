// 引入fs模块
const fs = require('fs');
console.log(__dirname)

module.exports = app =>{
  fs.readdirSync(__dirname).forEach(file=>{
    // 如果为入口文件 则终止
    console.log(file)
    if(file == 'index.js') return
    // 引入当前目录下所有路由
    const route = require(`./${file}`)
    // 注册路由
    app.use(route.routes(),route.allowedMethods())
  })
}
