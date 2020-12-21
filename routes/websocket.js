/**
 * Created by Dell on 2020/11/4.
 */


const router = require('koa-router')()
const {ResourceErr} = require('../core/http-exceptions')
const {wantFindData} = require('../db/processData')

router.prefix('/ws')


var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var server = ws.createServer(function (conn) {
    conn.on("text", function (str) {
        console.log("message:" + str)


        sendMess();

        function sendMess() {
            let data = [["2000-06-05",Math.random()*40+10],["2015-02-23",Math.random()*40+10],["2015-02-24",Math.random()*40+10]]

            conn.send(JSON.stringify(data));
            setTimeout(sendMess, 1000);
        }
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(8001)
console.log("WebSocket建立完毕")


module.exports = router
