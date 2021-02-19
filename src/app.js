//const express = require('express');
//es6语法
import express from 'express';
import config from './config';
import template from 'art-template';
import advertRouter from './routes/advert';
import indexRouter from './routes/index';
import bodyParser from './middlewares/body-parser';
import errorLog from './middlewares/error-log';

const app = express();

app.use('/public', express.static(config.publicPath));
app.use('/node_modules/', express.static(config.node_modules_path));
app.set('views', config.viewPath);
app.engine('html', require('express-art-template'));


//自己解析post表单
app.use(bodyParser);

//挂载路由容器(路由容器中组织了网站功能处理路由中间件)
app.use(advertRouter);
app.use(indexRouter);

app.use(errorLog);

app.listen(3000, () => {
    console.log("服务器已启动");
});