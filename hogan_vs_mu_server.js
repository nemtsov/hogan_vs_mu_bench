var PORT = 5000
  , http = require('http')
  , fs = require('fs')
  , util = require('util')

  , mu = require('mu')
  , hogan = require('hogan')

  , pageTplStr = fs.readFileSync('page.mu', 'utf8')
  , pageMiniTplStr = fs.readFileSync('page_mini.mu', 'utf8')

  , muPageMiniTpl = mu.compileText(pageMiniTplStr)
  , muPageTpl = mu.compileText(pageTplStr)

  , hoganPageTpl = hogan.compile(pageTplStr)
  , hoganPageMiniTpl = hogan.compile(pageMiniTplStr);

http.createServer(function (req, res) {
  var stream
    , string;

  if (req.url.match(/mu-mini/)) {
    stream = mu.render([muPageMiniTpl], {title: 'Mu Mini!'});
    util.pump(stream, res);

  } else if (req.url.match(/mu/)) {
    stream = mu.render([muPageTpl], {title: 'Mu!'});
    util.pump(stream, res);

  } else if (req.url.match(/hogan-mini/)) {
    string = hoganPageMiniTpl.render({title: 'Hogan Mini!'});
    res.end(string);

  } else if (req.url.match(/hogan/)) {
    string = hoganPageTpl.render({title: 'Hogan!'});
    res.end(string);

  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end();
  }
}).listen(PORT);

console.log('Listening on port %d with pid: %d',
            PORT, process.pid);
