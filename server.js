var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var config = {
    user: 'rizwanadam45',
    database:'rizwanadam45',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};
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
function hash(input , salt)
{
    var hashed = crypto.pbkdf2Sync(input ,salt,10000,512,'sha512');
    return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res)
{
    var hashedString = hash(req.params.input,'Randddoom string')
    res.send(hashedString);
})
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
                <div>${date.toDateString()}</div>
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
);

var pool = new Pool(config);
app.get('/articles/:articleName',function(req,res)
{
    pool.query("SELECT * FROM article WHERE title = $1" ,[req.params.articleName],function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length === 0)
            {
                res.status(404).send('Article not found!');
            }
            else
            {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});
app.get('/test-db',function(req,res)
{
    pool.query('SELECT name,id FROM test',function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});
var counter=0;
app.get('/counter',function(req,res)
{
    counter++;
    res.send(counter.toString());
})
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
