const {
    findData,
    addData,
    deleData,
    exitData
} = require('../db/mysql');


class userModal{
    // 查询用户名
    async find({username}){

        let _sql = `select * from table_user WHERE username= '${username}'`

        return await findData(_sql);
    }

    // 注册用户
    async reg(_params){

        // let _sql = `INSERT INTO table_user (username,password) VALUES ('${username}','${password}')`

        let _sql = `INSERT INTO table_user SET ?`;

        return await  addData(_sql,_params)
    }
}



export default new userModal