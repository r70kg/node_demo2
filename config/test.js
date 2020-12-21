/**
 * Created by Dell on 2020/10/21.
 */

'use strict';
/**
 * 测试环境配置文件
 */
var config = {
    env: 'test', //环境名称
    port: 3001, //服务端口号
    mysql_config: {
        //mysql数据库配置
        host: '192.168.8.89',
        user: 'root',
        port: '3306',
        database: 'shanghai_process',
        password: 'mvwchina',
        connectionLimit: 50 // 最大连接数
    },
    mongodb_config: {
        //mongodb数据库配置
    },
    redis_config: {
        //redis数据库配置
    },
};
module.exports = config;