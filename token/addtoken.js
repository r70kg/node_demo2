/**
 * Created by Administrator on 2020/12/21.
 */
const jwt = require('jsonwebtoken');
module.exports = (userinfo,serect,time) => { //创建token并导出

    console.log(userinfo)

    const token = jwt.sign({
        user: userinfo.username,
        id: userinfo.userId
    }, serect, {expiresIn: time+'s'});
    return token;
};