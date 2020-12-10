let express = require('express');
let connection = require('./config');
let bodyParser = require('body-parser');
let app = express();
let cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
connection.connect();
const path = require("path");
const compression = require("compression");
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use((req, res, next) => {
    if (!req.secure && req.get("x-forwarded-proto") !== "https") {
      return res.redirect("https://" + req.get("host") + req.url);
    }
    next();
  });
}

// Get all posts
app.get('/posts', (req, res)  => {
    connection.query('select * from BlogPosts order by id desc', (err, posts) => {
        if (err) {
            throw err;
        }
        res.json(posts);
    });
});

// Select a single post by id
app.get('/post/:id', (req, res) => {
  connection.query(`select * from BlogPosts where id=${req.params.id}`, (err, post) => {
    if (err) {
      throw err
    }
    res.json(post);
  })
})

// Add a post to database
app.post('/add', (req, res) => {
  connection.query(`insert into BlogPosts(title, text, date) values (${connection.escape(req.body.title)}, 
  ${connection.escape(req.body.text)}, ${connection.escape(req.body.date)})`, (err) => {
    if (err) {
      throw err
    }
    res.status(200)
    res.send()
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../dist", "AngularBlog")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "AngularBlog", "index.html"));
  });
}



app.listen(port, () => {
  console.log('Morjens' + port);
});
