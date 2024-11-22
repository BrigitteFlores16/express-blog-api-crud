
require ('dotenv').config();
const express = require('express');
const blog = express();
const port = process.env.HOST_PORT;
const domain =process.env.HOST_DOMAIN;
blog.use (express.json());

const postsRouter = require("./routers/posts.js");
blog.use('/posts',postsRouter);
blog.listen(port, () => {
  console.log(`server in ascolto sulla porta ${domain}:${port}`);
});
blog.use(express.static ('public'));
