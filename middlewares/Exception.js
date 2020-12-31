/**
 * Created by Dell on 2020/10/20.
 */
import {HttpExceptions} from '../core/http-exceptions';

// 全局异常捕捉中间件
const Exception = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        const {message, status} = err

        // 拦截 401 
        if (status === 401) {
            let _msg = err.originalError ? err.originalError.message : err.message
            ctx.fail(_msg, 401)

        } else {
            ctx.fail(err)
            /* const url = `${ctx.method} : ${ctx.request.path}`
        if (err instanceof HttpExceptions) {
            // 已知异常
            ctx.body = { msg, errorCode, url }
            ctx.status = code
        } else {
            // 未知异常
            ctx.body = { msg: '服务器内部错误~', errorCode: 999, url }
            ctx.status = 500
        } */
        }


    }
}

export default Exception;