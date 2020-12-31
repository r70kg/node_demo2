import fs from 'fs';

export default app =>{
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


/*export default app =>{
    fs.readdirSync(__dirname).forEach(async file=>{
        // 如果为入口文件 则终止
        console.log(file)
        if(file == 'index.js') return
        // 引入当前目录下所有路由
        const router = await import(`./${file}`);
        // 注册路由
        app.use(router.routes(),router.allowedMethods())
    })
}*/

