/**
 * Created by Administrator on 2020/12/21.
 * 生成token和refresh方法
 */
import jwt from 'jsonwebtoken';

export default (userId,serect,time) => { //创建token并导出

    const token = jwt.sign({
        userId: userId
    }, serect, {expiresIn: time+'s'});
    return token;
};