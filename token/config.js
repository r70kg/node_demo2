/**
 * Created by Administrator on 2020/12/22
 *
 * @secret: token 密匙
 * @refreshTokenSecret: refreshToken 密匙
 * @tokenLife: token 有效期 单位 s     10 min
 * @refreshTokenLife: refreshToken 有效期 单位 s   1h
 */

let conf = {
    "secret": "token",
    "refreshTokenSecret": "refreshToken",
    "tokenLife": 60*10,
    "refreshTokenLife": 60*60*1
}

export default conf;


