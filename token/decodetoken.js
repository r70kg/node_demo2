/**
 * Created by Administrator on 2020/12/23.
 */
import jwt from 'jsonwebtoken';

//解密token并导出
export default (token) => {
    const decoded = jwt.decode(token);
    return decoded;
};