
import nunjucks from 'nunjucks';

export function showIndex(req, res, next) {
    res.end(nunjucks.render('index.ejs'));
}