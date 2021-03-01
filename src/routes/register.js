import express from 'express';
import UserInfo from '../models/user-info';
import config from '../config';
import { basename } from 'path';
import nunjucks from 'nunjucks';

// 创建一个路由容器,将所有的路由中间件挂载给路由容器
const router = express.Router();

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  console.log(req.body);
  res.redirect('/VerificationCode');
});

router.get('/VerificationCode', (req, res, next) => {
  res.render('VerificationCode');
});

export default router;