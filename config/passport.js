/**
 * Created by Administrator on 2020/12/21.
 */
module.exports = passport => {
    const secretOrKey = 'secret' // 生成token的钥匙，解密时也需要
    const {userModel} = require('../models/user')  // 引入用户模型来验证token
    const JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secretOrKey;
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        const user = await userModel.findById(jwt_payload._id) // jwt_payload就是解密后的token，用他的_id在user模型中查找是否存在，并返回相应的true和false
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    }));
}
