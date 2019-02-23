const httpParser = require('http-string-parser');

module.exports = function(req, res) {
    res.render(req.path.slice(1), {
        method: req.method,
        get: req.query,
        post: req.body,
        headers: req.headers,
    }, function(err,code){
        //TODO 直入力の場合のヘッダ処理
        var st = httpParser.parseStatusLine(code.split(/\r?\n/)[0]);
        if(!st.protocol){
            code = "HTTP/1.1 200 OK\n" + code;
        }
        var r = httpParser.parseResponse(code);
        if(r.headers){
            Object.keys(r.headers).forEach(function(key) {
                res.set(key, r.headers[key]);
            });
        }
        res.status(r.statusCode||200).send(r.body);
    });
};