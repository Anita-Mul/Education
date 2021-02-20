import express from 'express';
import Advert from '../models/advert';
import formidable from 'formidable';
import config from '../config';
import { basename } from 'path';


// 创建一个路由容器,将所有的路由中间件挂载给路由容器
const router = express.Router();


router.get('/advert/count/', (req, res, next) => {
    Advert.count((err, count) => {
        if (err) {
            return next(err);
        }
        res.json({
            err_code: 0,
            result: count
        });
    })
})

//渲染advert_list首页
router.get('/advert', (req, res, next) => {
    res.render('advert_list.html');
    // res.render('test.html');
    // const page = Number.parseInt(req.query.page, 10);
    // const pageSize = 5;
    // Advert
    //     .find()
    //     .skip((page - 1) * pageSize)
    //     .limit(5)
    //     .exec((err, adverts) => {
    //         if (err) {
    //             return next(err);
    //         }
    //         Advert.count((err, count) => {
    //             if (err) {
    //                 return next(err);
    //             }

    //             //总页码 = 总记录数 / 每页显示的大小
    //             const totalPage = Math.ceil(count / pageSize + 1);
    //             res.render('advert_list.ejs', {
    //                 adverts,
    //                 totalPage,
    //                 page
    //             });
    //         })
    //     })
});


router.get('/advert/add', (req, res, next) => {
    res.render('advert_add.html');
});


/**
 * POST /advert/add
 * body: {title, image, link, start_time, end_time}
 */
router.post('/advert/add', (req, res, next) => {

    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadDir; //配置formidable文件上传路径
    form.keepExtensions = true; //保持文件
    form.encoding = 'utf-8';
    //fields就是接收到的表单中的普通数据字段
    //files就是表单中文件上传来的一些文件信息,例如文件大小,上传上来的文件路径..

    new Promise((res, rej) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                rej(err);
            }
            res({ fields, files });
        });
    })

        .then(data => {
            const body = data.fields;
            body.images = data.files.images.name;

            //就是在body中添加一个image值就是图片上传上来的路径
            const advert = new Advert({
                title: body.title,
                images: body.images,
                link: body.link,
                start_time: body.start_time,
                end_time: body.end_time,
            });

            return advert;
        })
        .then(data => {
            data.save((err, result) => {
                if (err) {
                    return next(err);
                }
                res.json({
                    err_code: 0
                })
            });
        });
});

router.get('/advert/list', (req, res, next) => {
    let { page, pageSize } = req.query
    page = Number.parseInt(page);
    pageSize = Number.parseInt(pageSize);

    Advert
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, adverts) => {
            if (err) {
                return next(err);
            }
            res.json({
                err_code: 0,
                result: adverts
            })
        })

    // Advert.find((err, date) => {
    //     if (err) {
    //         return next(err);
    //     }

    //     res.json({
    //         err_code: 0,
    //         result: date
    //     })
    // })
    //res.render('advert_list.ejs');
})

// /advert/1
// /advert/2
// /advert/3
// advertId 是模糊匹配
router.get('/advert/one/:advertId', (req, res, next) => {
    Advert.findById(req.params.advertId, (err, result) => {
        if (err) {
            return next(err);
        }

        res.json({
            err_code: 0,
            result: result
        })
    })
});


// /advert/edit
router.post('/advert/edit', (req, res, next) => {
    Advert.findById(req.body.id, (err, advert) => {
        if (err) {
            return next(err);
        }

        const body = req.body;
        advert.title = body.title;
        advert.images = body.images;
        advert.link = body.link;
        advert.start_time = body.start_time;
        advert.end_time = body.end_time;
        advert.last_modified = Date.now();

        advert.save((err, result) => {
            if (err) {
                return next(err);
            }

            res.json({
                err_code: 0
            });
        });
    })
});


router.get('/advert/remove/:advertId', (req, res, next) => {
    Advert.remove({ _id: req.params.advertId }, err => {
        if (err) {
            return next(err);
        }

        res.json({
            err_code: 0
        });
    });
})
// 通过exports default暴露的成员不能定义的同时直接暴露
//最好先定义,再暴露
//export default可以直接暴露字面量 {} 123
export default router;

