const router = require('koa-router')()

import userController from '../controllers/user';
router.prefix('/user')

/**
 * 接口列表
 */

// 注册
router.post('/register',userController.register);
// 登陆
router.post('/login',userController.login);
// 刷新token
router.post('/refreshtoken',userController.refreshtoken);
// 获取用户信息
router.post('/userInfo',userController.userInfo);
// 修改密码
router.post('/updatePassword',userController.updatePassword);


module.exports = router;
