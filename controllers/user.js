import userModal from '../models/user';


class userController {
    // 用户注册
     async register(ctx) {

        const { username, password } = ctx.request.body;

        if (username && password) {

            try {
                // 用户是否已存在
                const query =await userModal.find({
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

            } catch (err){
                ctx.response.status = 416;
                ctx.body = {
                    code: -1,
                    desc: '参数不齐全'
                }
            }

        }

    }
}

export default new userController;