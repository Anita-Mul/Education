//const express = require('express');
//es6语法
import express from 'express';
import config from './config';
import nunjucks from 'nunjucks';
import advertRouter from './routes/advert';
import indexRouter from './routes/index';
import registerRouter from './routes/register';
//import loginRouter from './routes/login';
import bodyParser from './middlewares/body-parser';
import errorLog from './middlewares/error-log';


const app = express();

app.use('/public', express.static(config.publicPath));
app.use('/node_modules/', express.static(config.node_modules_path));

// 模板引擎相关配置
app.set('views', config.viewPath);
app.set('view engine', 'ejs');

// 配置使用 nunjucks模板引擎
// nunjucks模板引擎没有对模板文件的后缀名做特定限制
// 如果文件名是 a.html ,则渲染的时候就需要传递 a.html
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    //不缓存
    noCache: true
});

//自己解析post表单
app.use(bodyParser);

//挂载路由容器(路由容器中组织了网站功能处理路由中间件)
app.use(advertRouter);
app.use(indexRouter);
app.use(registerRouter);
//app.use(loginRouter);

app.use(errorLog);

app.listen(3000, () => {
    console.log("服务器已启动");
});