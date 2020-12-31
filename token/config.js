/**
 * Created by Administrator on 2020/12/22.
 */
let conf = {
    "secret": "token",
    "refreshTokenSecret": "some-secret-refresh-token-shit",
    "port": 3000,
    "tokenLife": 60 * 10, //  10 min
    "refreshTokenLife": 60 * 60 * 2 // 2h
}

module.exports = conf;


