var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articleTwo={
    title:"Article one|Rizwan Adam",
    heading:"Article One",
    date:"Feb 19,2018",
    content:`<p>
                    Hello!I am RAM.This is my second article.
                </p>
                <p>
                    This is an html demo. This is an html demo. This is an html demo. This is an html demo.
                <hr>
                <p>
                    Nanananannananannanananannanan Batman!
                </p>`
}
function createTemplate(data)
{   
    var title =data.title;
    var heading = data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate=
    `<html>
        <head>
            ${title}
            <meta name="Viewport" content="width=device-width, intial scale =1" />
            <link href="/ui/style.css" rel ="stylesheet" />
        </head>
        <body>
            <div class="cntnr">
                <div>
                    <a href ="/">Home</a>
                </div>
                <div>
                    <h3>${heading}</h3>
                </div>
                <div>${date}</div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
        
    </html>`;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article-one', function(req,res)
{
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
}
)
app.get('/ui/main.js',function(req,res)
{
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
})
app.get('/article-two', function(req,res)
{
   res.send(createTemplate(articleTwo));
}
)
app.get('/article-three', function(req,res)
{
    res.send('Article three will be displayed here');
}
)
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
