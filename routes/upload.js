const router = require('koa-router')()
import fs from 'fs';
import path from 'path';

router.prefix('/upload')

router.post('/uploadfiles', async (ctx, next) => {
    ctx.body = 'this is a users response!'
    // 上传多个文件
    const files = ctx.request.files.file;  // 获取上传文件
    console.log(666)
    console.log(files)
    for(let file of files){
        // 创建可读流
        const reader = fs.createReadStream(file.path);

        console.log(reader)
        // 获取上传文件扩展名
        let filePath = path.join(__dirname,'../upload')+`/${file.name}`;
        console.log(1111)
        console.log(filePath)
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        return ctx.body = '上传成功!';
    }
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

module.exports = router;
