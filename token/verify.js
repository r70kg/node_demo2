/**
 * @name:verify
 * @author:kk
 * @date:2020/12/30
 * @desc:verify refresh_token
 * 通过返回 1
 */
import tkconf from './config';
import jwt from 'jsonwebtoken';

module.exports =  function verify_refreshToken(refreshToken) {
    return jwt.verify(refreshToken, tkconf.refreshTokenSecret, (err, decode) => {
        return err ? err : 1
    })
}