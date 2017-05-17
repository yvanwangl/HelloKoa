// 对于任何请求，app将调用该异步函数处理请求：
const fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};


//处理登录的post请求
const fn_signin = async (ctx, next)=>{
    const requestBody = ctx.request.body,
          name = requestBody.name,
          password = requestBody.password;
    if(name=='koa'&&password=='12345'){
        ctx.response.body = `<h1>Hello, ${name}</h1>`;
    }else {
        ctx.response.body = `<h1>Login failed, please <a href="/">retry!</a></h1>`
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};