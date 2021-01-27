const cache = require('memory-cache');
const crypto = require('crypto');
const token='';

class wxController{
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


    //redirectUrl 授权回调地址，从客户端返回的地址
    //callback 获取openId 用户点击授权，调用这个
    async redirect ({request}) {

       
        let redirectUrl = request.query.url,
            scope = request.query.scope,
            callback = 'http://82.156.63.111/api/wx/getOpenId'


        cache.put('redirectUrl', redirectUrl)
        let authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appId}&redirect_uri=${callback}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
        res.redirect(authorizeUrl);
    }

   
    // 根据code获取用户的openId
    async getOpenId ({request, response}) {
        let code = request.query.code
        if (!code) {
            request.json({
            code: 1001,
            data: '',
            message: '当前未获取到code码',
          })
        } else {
          // 拿到用户openId
          let token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appId}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`
          request.get(token_url, function (err, response, body) {
            console.log(body)
            if (!err && response.statusCode == '200') {
              let data = JSON.parse(body)
              if (data && !data.errCode) {
                let expire_time = 1000 * 60 * 60 * 2 //过期时间
                cache.put('access_token', data.access_token, expire_time)
                cache.put('openId', data.openId, expire_time)
                res.cookie('openId', data.openid, {
                  maxAge: expire_time,
                }) //存储openId
                let redirectUrl = cache.get('redirectUrl')
                res.redirect(redirectUrl)
              } else {
                res.json({
                  code: data.errcode,
                  data: '',
                  message: data.errmsg,
                })
              }
            } else {
              res.json({
                code: 1009,
                data: '',
                message: err,
              })
            }
          })
        }
      }





}


export default new wxController;