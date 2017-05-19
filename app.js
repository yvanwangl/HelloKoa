// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const bodyParser = require('koa-bodyparser');
//auto config router with koa-router
//const router = require('koa-router')();
const controller = require('./controller');
const templating = require('./templating');

//判断是否是生产环境
const isProduction = process.env.NODE_ENV === 'production';

// 创建一个Koa对象表示web app本身:
const app = new Koa(); 

//第一个中间件：记录URL以及页面执行时间
//log request URL:
app.use(async (ctx, next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url} ${ctx.request.path}...`);
    let startTime = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime()-startTime;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});


//第二个中间件: 处理静态文件
//set static middleware
if(!isProduction) {
    const staticFiles = require('./staticFiles');
    app.use(staticFiles('/static/', __dirname+'/static'));
}

//第三个中间件：解析POST请求体body数据
//add bodyparser middleware:
app.use(bodyParser());
//app.use(router.routes());

//第四个中间件：给ctx对象增加render方法
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

//第五个中间件：处理路由
// add router middleware:
app.use(controller());

//监听端口3000
app.listen(3000);
console.log('app started at port 3000...');
console.log('server on mac');