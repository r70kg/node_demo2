const {
    findData,
    addData,
    deleData,
    exitData
} = require('../db/mysql');


class userModal{
    // 查询用户名
    async findUserName({username}){

        let _sql = `SELECT username,userId,password,sex from table_user WHERE username= '${username}'`

        return await findData(_sql);
    }

    // 查询用户信息
    async findUserInfo({userId}){

        let _sql = `SELECT userId from table_user WHERE userId= '${userId}'`

        return await findData(_sql);
    }

    // 注册用户
    async reg(_params){

        // let _sql = `INSERT INTO table_user (username,password) VALUES ('${username}','${password}')`

        let _sql = `INSERT INTO table_user SET ?`;

        return await  addData(_sql,_params)
    }
    // 更新密码
    async updatePassword(_params){
        let _sql = `update user set ? where username=?`;
        return await  exitData(_sql,_params)
    }
}



export default new userModal