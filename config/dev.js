/**
 * Created by Dell on 2020/10/21.
 */

'use strict';
/**
* 开发环境配置文件
*/
var config = {
    env: 'dev', //环境名称
    port: 3001, //服务端口号
    mysql_config: {
        //mysql数据库配置
        host: '192.168.8.169',
        user: 'root',
        port: '3306',
        database: 'ifsm',
        password: 'aaaa24685',
        connectionLimit: 50 // 最大连接数
    },
    mongodb_config: {
        //mongodb数据库配置
    },
    redis_config: {
        //redis数据库配置
    },
    wx:{
        appId:'wx815629929dadc0fd',
        appSecret:'e0ea687f1e32d1669c046fc54d115181'
    }
};

module.exports = config;