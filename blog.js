
require ('dotenv').config();
const express = require('express');
const blog = express();
const port = process.env.HOST_PORT;
const domain =process.env.HOST_DOMAIN;

const errorsHandler =require('./middlewares/errorsHandler.js');
const notFound = require('./middlewares/notFound.js');

blog.use (express.json());
blog.use(express.static ('public'));

const postsRouter = require("./routers/posts.js");
blog.use('/posts',postsRouter);

blog.use(errorsHandler) ;

blog.listen(port, () => {
  console.log(`server in ascolto sulla porta ${domain}:${port}`);
});

