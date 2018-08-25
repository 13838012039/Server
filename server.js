var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true)
    var path = request.url
    var query = ''
    if (path.indexOf('?') >= 0) { query = path.substring(path.indexOf('?')) }
    var pathNoQuery = parsedUrl.pathname
    var queryObject = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    // console.log('HTTP 路径为\n' + path)

    // // response.write('hi')
    // // response.end()

    // if (path === '/style.css') {
    //     response.setHeader('Content-Type', 'text/css; charset=utf-8')
    //     response.write('body{background-color: #ddd;}h1{color: red;}')
    //     response.end()
    // } else if (path === '/main.js') {
    //     response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    //     response.write('alert("这是JS执行的")')
    //     response.end()
    // } else if (path === '/') {
    //     response.setHeader('Content-Type', 'text/html; charset=utf-8')
    //     response.write('<!DOCTYPE>\n<html>' +
    //         '<head><link rel="stylesheet" href="/style.css">' +
    //         '</head><body>' +
    //         '<h1>你好</h1>' +
    //         '<script src="/main.js"></script>' +
    //         '</body></html>')
    //     response.end()
    // } else {
    //     response.statusCode = 404
    //     response.end()
    // }



    if (path === '/') {
        var string = fs.readFileSync('./index.html', 'utf8')
        var amount = fs.readFileSync('./db', 'utf8') //100

        string = string.replace("&&&amount&&&", amount)

        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(string)
        response.end()
    } else if (path === '/css/style.css') {
        var string = fs.readFileSync('./css/style.css', 'utf8')
        response.setHeader('Content-Type', 'text/css')
        response.write(string)
        response.end()
    } else if (path === '/js/main.js') {
        var string = fs.readFileSync('./js/main.js', 'utf8')
        response.setHeader('Content-Type', 'application/javascript')
        response.write(string)
        response.end()
    } else if (path === '/pay' && method.toUpperCase() === 'POST') {
        var amount = fs.readFileSync('./db', 'utf8')
        var newAmount = amount - 1
        if (Math.random() > 0.5) {
            fs.writeFileSync('./db', newAmount)
            response.write('success')

        } else {
            response.write('fail')
        }
        response.end()

    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write('找不到路径，需要修改index.js')
        response.end()
    }







    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)