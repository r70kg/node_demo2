const router = require('koa-router')()
const {ResourceErr} = require('../core/http-exceptions')

import userController from '../controllers/user';
router.prefix('/users')

/**
 * 接口列表
 */

// 注册
router.post('/register',userController.register);






















module.exports = router
