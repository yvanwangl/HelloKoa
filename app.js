// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

// 创建一个Koa对象表示web app本身:
const app = new Koa(); 

//log request URL:
app.use(async (ctx, next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    console.log(name);
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

// 对于任何请求，app将调用该异步函数处理请求：
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

//处理登录的post请求
router.post('/signin', async (ctx, next)=>{
    let requestBody = ctx.request.body,
        name = requestBody.name || '',
        password = requestBody.password || '';
    console.log(`signin with name: ${name} and password: ${password}`);
    if(name=='koa'&& password=='12345'){
        ctx.response.body = `<h1>welcome, ${name}</h1>`
    }else {
        ctx.response.body = `<h1>Login failed!</h1>
            <p><a href="/">Try Again</a></p>
        `
    }
});

//add bodyparser middleware:
app.use(bodyParser());

// add router middleware:
app
  .use(router.routes())
  .use(router.allowedMethods());

//监听端口3000
app.listen(8080);
console.log('app started at port 8080...');