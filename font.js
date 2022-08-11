/*
 * @Author: pglin66@126.com
 * @Date: 2022-08-10 17:56:23
 * @LastEditors: pglin66@126.com
 * @LastEditTime: 2022-08-11 11:31:48
 * @FilePath: \mps_merchantc:\Users\plin\Downloads\minifont\font.js
 * @Description: 
 */
var Fontmin = require('fontmin');
const http = require('http')
const querystring = require('querystring') // 引入 node:querystring 模块解析url
http.createServer(function (request, response) {    
    const url = request.url
    request.query = querystring.parse(url.split('?')[1]) // 通过 ? 问号 分隔参数，并使用 querystring.parse 解析问号后面的参数
    //console.log('query: ', request.query) // 输出参数
    if(!request.query||!request.query.text){
        response.end('请求参数不能为空');
        return 
    }
    var fontmin = new Fontmin()
        .src('xjh.ttf')
        .use(Fontmin.glyph({
            text: request.query.text,
        }))
    fontmin.run(function (err, files, stream) {
        if (err) {
            throw err;
        }  
        console.log(files[0].contents.toString("base64"))
        //response.writeHead(200, {'Content-Type': 'application/x-font-ttf'});
        //response.write( files[0].contents.toString("base64") );
        response.end(JSON.stringify({
            code:200,
            data:files[0].contents.toString("base64")
        }));
        // console.log(files[0]);
        // => { contents: <Buffer 00 01 00 ...> }
    });
}).listen(8888);
/* 
var Fontmin = require('fontmin');

var srcPath = 'src/font/TencentSans-W7.ttf'; // 字体源文件
var destPath = 'asset/font';    // 输出路径
var text = '嘿嘿嘿';

// 初始化
var fontmin = new Fontmin()
    .src(srcPath)               // 输入配置
    .use(Fontmin.glyph({        // 字型提取插件
        text: text              // 所需文字
    }))
    .use(Fontmin.ttf2eot())     // eot 转换插件
    .use(Fontmin.ttf2woff())    // woff 转换插件     
    .use(Fontmin.ttf2svg())     // svg 转换插件
    .use(Fontmin.css())         // css 生成插件
    .dest(destPath);            // 输出配置

// 执行
fontmin.run(function (err, files, stream) {

    if (err) {                  // 异常捕捉
        console.error(err);
    }

    console.log('done');        // 成功
}); */