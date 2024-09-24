const path = require('path');
const express = require('express')
const fs = require('fs');
const cors = require('cors')
const app = express()

const componentsData = fs.readFileSync('components.json');
const components = JSON.parse(componentsData);
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'views')));

// 当访问根URL时，Express会尝试从public目录中提供index.html文件  
app.get('/', (req, res) => {  
    // 通常这里不需要做任何特别的事情，因为express.static已经处理了  
    // 但如果你需要重定向或做其他事情，可以在这里做  
    res.sendFile(path.join(__dirname, 'views/breathy', 'index.html')); // 注意：这实际上并不是必需的，除非你有特殊需求  
});  

app.get('/demo', function(req, res) {
  res.render('index', {components});
});

for (const component of components) {
  app.get("/demo/" + component.name, (req, res) => {
    res.sendFile(path.join(__dirname, `views/${component.name}`, 'index.html')); // 注意：这实际上并不是必需的，除非你有特殊需求  
  });
  app.get("/demo/" + component.name + "/*", (req, res) => {
    res.sendFile(path.join(__dirname, `views/${component.name}`, req.url.replace(/^(\/demo\/[^\/]+\/)(.*)$/, '$2'))); // 注意：这实际上并不是必需的，除非你有特殊需求  
  });
}

app.listen(port, hostname, () => {
  console.log(`Server started on port ${port}`);
});