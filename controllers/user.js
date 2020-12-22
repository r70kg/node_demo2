import userModal from '../models/user';

const jwt = require('jsonwebtoken');

// token配置
const tkconf = require('../token/config');
// 创建token
const addtoken = require('../token/addtoken');
// 验证token
const proving = require('../token/proving');



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
            const res = await userModal.find({
                username
            });


            if (res.length) {


                console.log(tkconf.secret)

                // 创建 token 和 refresh_token
                const access_token = addtoken(res[0],tkconf.secret,tkconf.tokenLife);
                // const refresh_token = jwt.sign(res[0], tkconf.refreshTokenSecret,tkconf.refreshTokenLife);

                ctx.success({
                    access_token
                });
            }else {
                ctx.fail('用户名或密码错误',-1);
            }
        }else{
            ctx.fail('用户名或者密码不能为空',-1);
        }


    }

    async test(ctx){
        let token = ctx.request.header.authorization;


        console.log(token)
        if (token){
            //  获取到token
            let res = proving(token);
            if (res && res.exp <= new Date()/1000){
                ctx.body = {
                    message: 'token过期',
                    code:3
                };
            } else {
                ctx.body = {
                    message: '解析成功',
                    code:1
                }
            }
        } else{  // 没有取到token
            ctx.body = {
                msg:'没有token',
                code:0
            }
        }
    }
}


export default new userController;