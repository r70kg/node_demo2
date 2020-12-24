/**
 * Created by Administrator on 2020/12/21.
 * 生成token和refresh方法
 */
const jwt = require('jsonwebtoken');
module.exports = (userId,serect,time) => { //创建token并导出

    console.log(userId)

    const token = jwt.sign({
        userId: userId
    }, serect, {expiresIn: time+'s'});
    return token;
};