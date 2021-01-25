const router = require('koa-router')()

import wxController from '../controllers/wechat';
router.prefix('/wx')

/**
 * 接口列表
 */

// token验证
router.get('/wechat/verify',wxController.wxToken);


module.exports = router;
