const crypto = require('crypto');
const token='';

class wxController {
    // wx验证token
    async wxToken(ctx) {


        const {signature, timestamp, nonce, echostr} = ctx.request.body;
        if(!signature ||!timestamp||!nonce||!echostr){
            ctx.fail('invalid request');
            return;
        }

        // 将token、timestamp、nonce三个参数进行字典序排序
        const params = [token,timestamp,nonce];
        params.sort();
        let sortStr = params.join('');

        // 将三个参数字符串拼接成一个字符串进行sha1加密
        let sha1 = (str) =>(crypto.createHash('sha1')).update(str,'utf-8').digest('hex');
        let sha1Str = sha1(sortStr.toString().replace(/,/g,''));

        if(signature === sha1Str){
            ctx.success({echostr})
        }else{
            ctx.fail('false');
        }






        if (!signature ||!timestamp||!nonce||!echostr) {

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
}


export default new wxController;