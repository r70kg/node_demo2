/**
 * Created by Administrator on 2020/12/23.
 */
const jwt = require('jsonwebtoken');

//解密token并导出
module.exports = (token) => {
    const decoded = jwt.decode(token);
    return decoded;
};