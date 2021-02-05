const cache = require('memory-cache');
const crypto = require('crypto');
const wxConfig = require('../config/index').wx;
const httpRequest = require('request');




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
    async redirect (ctx) {
      let {request,response} = ctx;



       
        let redirectUrl = request.query.url,
            scope = request.query.scope,
            callback = 'http://m.imooc.com:81/wx/getOpenId'


        cache.put('redirectUrl', redirectUrl)
      
        let authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.appId}&redirect_uri=${callback}&response_type=code&scope=${scope}&state=STATE&connect_redirect=1#wechat_redirect`
        // let authorizeUrl = 'http://www.baidu.com'
        console.log('000');
        ctx.success({authorizeUrl});
        console.log(authorizeUrl)
        // ctx.response.redirect(authorizeUrl);
        // ctx.response.redirect(url) // 重定向到这个地址
    }

   
    // 根据code获取用户的openId
    async getOpenId (ctx) {

        let {request, response} = ctx;
       
        let code = request.query.code;


        if (!code) {
            ctx.fail('当前未获取到code码');
        } else {
          // 拿到用户openId
          let token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxConfig.appId}&secret=${wxConfig.appSecret}&code=${code}&grant_type=authorization_code`
            httpRequest.get(token_url, function (err, response, body) {
            if (!err && response.statusCode == '200') {
              let data = JSON.parse(body)
              if (data && !data.errCode) {
                let expire_time = 1000 * 60 * 60 * 2 //过期时间
                cache.put('access_token', data.access_token, expire_time)
                cache.put('openId', data.openid, expire_time)

                /* ctx.cookies.set(
                  'openId',
                  data.openid
                ) */
                /* ctx.cookie('openId', data.openid, {
                  maxAge: expire_time,
                }) //存储openId */
                let redirectUrl = cache.get('redirectUrl')
                ctx.redirect(redirectUrl)
              } else {
                ctx.fail(data.errmsg);
              }
            } else {
              ctx.fail(err);
            }
          })
        }
      }

}


export default new wxController;