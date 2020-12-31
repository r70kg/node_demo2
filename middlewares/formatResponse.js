/**
 * 格式化数据结构
 * 成功返回
   ！！！ 内部返回要用 async
   {
     "code":200,
     "msg":"success",
     "data":{
         "items":[]
     }
   }
 *  失败返回
    {
      "code":99,
      "msg":"参数不完整"
    }
 *
 */


const formatResponse = (option = {}) => {
    return async (ctx, next) => {

        console.log(ctx)

        ctx.success = (data = {}, successMsg, code, type = 'json') => {
            ctx.type = type || option.type || 'json'
            ctx.body = {
                code: option.successCode || code || 1,
                msg: option.successMsg || successMsg || '调用成功',
                data
            }
        }



        ctx.fail = (msg, code) => {
            ctx.type = option.type || 'json'
            ctx.body = {
                code: option.failCode || code || 0,
                msg: msg || option.failMsg || '调用失败'
            }
        }
        await next()
    }
}
export default formatResponse;








