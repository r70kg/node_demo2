/**
 * Created by Dell on 2020/10/20.
 */
    // 自定义异常
class HttpExceptions extends Error {
    constructor(msg='服务器异常', errorCode = 0, code = 400) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}

// 资源未找到异常
class ResourceErr extends HttpExceptions {
    constructor(msg='资源未找到', errorCode = 1, code = 404) {
        super(msg, errorCode, code)
    }
}

module.exports = {
    HttpExceptions,
    ResourceErr
}