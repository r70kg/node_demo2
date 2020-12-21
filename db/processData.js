const {
    findData,
    addData,
    deleData,
    exitData
} = require('./mysql');

// ------------------ctx.query获取get请求参数--------------------------------------
// ------------------ctx.request.body获取post请求参数------------------------------
// let data = fs.readFileSync('./k_Mongo/shopList.json', 'utf-8'); 读取文件信息

// 这边通过async方法保证数据的同步获取
let wantFindData = async (ctx)=>{
    
    
    
    let res = ctx.query ||{};
    // 返回的数据格式为json
    ctx.response.type = 'json';
    let statements = res.statements|| '';
    let parameter = res.parameter|| '';

    console.log(9999)
    console.log(statements)

    return await findData(statements, parameter)
}
let wantAddData = async(ctx) => { // 添加数据
    let res = ctx.request.body;
    let statements = res.statements;
    let parameter = JSON.parse(res.parameter);
    ctx.response.type = 'json';
    await addData(statements, parameter).then(data => {
        ctx.body = data;
    }, () => {
        ctx.body = { err: '数据添加失败' };
    });
};
let wantDeleData = async(ctx) => { // 删除数据
    let res = ctx.query;
    let statements = res.statements;
    ctx.response.type = 'json';
    await deleData(statements).then(data => {
        ctx.body = data;
    }, () => {
        ctx.body = { err: '数据删除失败' };
    });
};

let wantExitData = async(ctx) => { // 修改数据
    let res = ctx.request.body;
    let parameter = JSON.parse(res.parameter);
    let statements = res.statements;
    ctx.response.type = 'json';
    await exitData(statements, parameter).then(data => {
        ctx.body = data;
    }, () => {
        ctx.body = { err: '数据修改失败' };
    });
};

module.exports = {
    wantFindData,
    wantAddData,
    wantDeleData,
    wantExitData
};

