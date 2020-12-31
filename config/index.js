import path from 'path';

console.log(`运行环境${process.env.NODE_ENV}`)

var env = process.env.NODE_ENV || 'prod'
env = env.toLowerCase()

// 载入配置文件
var file = path.resolve(__dirname,env)
try{
    var config = require(file)
    console.log('Load config: [%s] %s', env, file);
}catch (err) {
    console.error('Cannot load config: [%s] %s', env, file);
    throw err;
}

module.exports = config;