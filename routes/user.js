const router = require('koa-router')()
const {ResourceErr} = require('../core/http-exceptions')

import userController from '../controllers/user';
router.prefix('/user')

/**
 * 接口列表
 */

// 注册
router.post('/register',userController.register);
// 登陆
router.post('/login',userController.login);

router.get('/test',userController.test);





















module.exports = router
