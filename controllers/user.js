import userModal from '../models/user';

// token配置
import tkconf from '../token/config';
// 创建 token
import addtoken from '../token/addtoken';
// 解密 token
import decodetoken from '../token/decodetoken';
// 验证 refreshToken
import verify_refreshToken from '../token/verify';


class userController {
    // 注册
    async register(ctx) {


        const {username, password} = ctx.request.body;

        if (username && password) {

            try {
                // 用户是否已存在
                const query = await userModal.findUserName({
                    username
                });

                if (query.length) {
                    ctx.success({}, '用户已存在')

                } else {

                    // 注册
                    const data = await userModal.reg({
                        username: username,
                        password: password
                    });
                    ctx.success({
                        userInfo: {
                            username: username
                        }
                    }, '注册成功')
                }

            } catch (err) {
                ctx.fail('服务器错误');
            }
        } else {
            ctx.fail('不能为空');
        }

    }

    // 登陆
    async login(ctx) {
        const {username, password} = ctx.request.body;
        if (username && password) {
            let pwd = password
            // 用户是否已存在
            const res = await userModal.findUserName({
                username
            });
            if (res.length) {
                let {userId, password} = res[0];
                if (pwd == password) {
                    // 创建 token 和 refresh_token
                    const access_token = addtoken(userId, tkconf.secret, tkconf.tokenLife);
                    const refresh_token = addtoken(userId, tkconf.refreshTokenSecret, tkconf.refreshTokenLife);
                    ctx.success({
                        access_token,
                        refresh_token,
                        userInfo: res[0]
                    }, '登录成功');
                } else {
                    ctx.fail('用户名或密码错误');
                }

            } else {
                ctx.fail('用户未注册');
            }
        } else {
            ctx.fail('用户名或者密码不能为空');
        }
    }

    // 用户信息
    async userInfo(ctx) {
        const {userId} = ctx.request.body;
        const res = await userModal.findUserInfo({
            userId
        });

        if (res.length) {
            ctx.success({
                userInfo: res[0]
            });
        } else {
            ctx.fail('错误');
        }

    }

    // 刷新 refreshtoken
    async refreshtoken(ctx) {
        const {refreshToken} = ctx.request.body;
        // 验证 refreshToken 1:通过
        let _res = verify_refreshToken(refreshToken)
        if(_res===1){
            let {userId} = decodetoken(refreshToken)
            const access_token = addtoken(userId, tkconf.secret, tkconf.tokenLife);
            const refresh_token = addtoken(userId, tkconf.refreshTokenSecret, tkconf.refreshTokenLife);
            ctx.success({
                access_token,
                refresh_token
            });
        }else{
            ctx.fail(_res.message,401);
        }
    }

    // 修改密码
    async updatePassword(ctx) {
        let {username, oldPassword, newPassword, aginPassword} = ctx.request.body;

        // 判空
        let _arr = [{
            key: username,
            tip: '用户名不能为空'
        }, {
            key: oldPassword,
            tip: '原密码不能为空'
        }, {
            key: newPassword,
            tip: '新密码不能为空'
        }, {
            key: aginPassword,
            tip: '二次确认密码不能为空'
        }];


        function isEmpty(_arr) {
            let flag = true;
            for (var i = 0; i < _arr.length; i++) {
                if (!_arr[i].key) {
                    flag = false;
                    ctx.fail(_arr[i].tip);
                    break;
                }
            }

            if (flag) {
                if (aginPassword !== newPassword) {
                    ctx.fail('两次新密码不一致');
                    flag = false;
                }
            }
            return flag;
        }
        isEmpty(_arr, newPassword, newPassword)


        if (isEmpty(_arr, newPassword, newPassword)) {
            // 判断用户是否存在
            const _res = await userModal.findUserName({
                username
            });


            console.log(999999999999)

            if (_res.length) {
                await userModal.updatePassword({
                    username: username,
                    password: newPassword
                });

                ctx.success({}, '修改成功');
            } else {
                ctx.fail('服务器错误');
            }
        }


    }
}


export default new userController;