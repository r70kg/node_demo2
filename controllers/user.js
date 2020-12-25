import userModal from '../models/user';

const jwt = require('jsonwebtoken');

// token配置
const tkconf = require('../token/config');
// 创建token
const addtoken = require('../token/addtoken');
// 解密token
const decodetoken = require('../token/decodetoken');



class userController {
    // 注册
    async register(ctx) {

        const {username, password} = ctx.request.body;

        if (username && password) {

            try {
                // 用户是否已存在
                const query = await userModal.find({
                    username
                });

                if (query.length) {
                    ctx.success({
                        code: -1,
                        msg: '用户已存在'
                    });
                } else {

                    // 注册
                    const data = await userModal.reg({
                        username: username,
                        password: password
                    });

                    ctx.success({
                        code: 0,
                        msg: '用户注册成功',
                        userInfo: {
                            username: username
                        }
                    })
                }

            } catch (err) {
                ctx.response.status = 416;
                ctx.body = {
                    code: -1,
                    desc: '参数不齐全'
                }
            }
        }

    }

    // 登陆
    async login(ctx){
        const {username, password} = ctx.request.body;
        if(username&&password){
            // 用户是否已存在
            const res = await userModal.findUserName({
                username
            });
            if (res.length) {
                console.log(tkconf.secret)
                let {userId} = res[0]
                // 创建 token 和 refresh_token
                const access_token = addtoken(userId,tkconf.secret,tkconf.tokenLife);
                const refresh_token = addtoken(userId, tkconf.refreshTokenSecret,tkconf.refreshTokenLife);
                ctx.success({
                    access_token,
                    refresh_token,
                    userInfo:res[0]
                });
            }else {
                ctx.fail('用户名或密码错误',-1);
            }
        }else{
            ctx.fail('用户名或者密码不能为空',-1);
        }
    }
    // 用户信息
    async userInfo(ctx){
        const {userId} = ctx.request.body;
        const res = await userModal.findUserInfo({
            userId
        });

        if (res.length) {
            ctx.success({
                userInfo:res[0]
            });
        }else {
            ctx.fail('错误',-1);
        }

    }
    // 刷新 refreshtoken
    async refreshtoken(ctx){
        const {refreshToken} = ctx.request.body;
        if(refreshToken){
            let {userId} = decodetoken(refreshToken)
            const access_token = addtoken(userId,tkconf.secret,tkconf.tokenLife);
            const refresh_token = addtoken(userId,tkconf.refreshTokenSecret,tkconf.refreshTokenLife);
            ctx.success({
                access_token,
                refresh_token
            });
        }
    }
}


export default new userController;