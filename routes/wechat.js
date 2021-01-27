const router = require('koa-router')()

import wxController from '../controllers/wechat';
router.prefix('/wx')

/**
 * 接口列表
 */

// token验证
router.get('/wechat/verify',wxController.wxToken);







//redirectUrl 授权回调地址，从客户端返回的地址
//callback 获取openId 用户点击授权，调用这个

router.get('/redirect',wxController.redirect);
router.get('/getOpenId',wxController.getOpenId);


module.exports = router;
