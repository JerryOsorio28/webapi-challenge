//Pulls express dependency
const express = require('express');

//Run our server under the express depencency
const server = express();

//Teaches express to parse the content of the body to JSON
server.use(express.json()) 

//add your middleware used globally here
server.use(logger)

//Adding projects Router
const projectsRouter = require('./data/endpoints/projectsRouter');
server.use('/api/projects', projectsRouter);

//Adding actions Router
const actionsRouter = require('./data/endpoints/actionsRouter');
server.use('/api/projects', actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Server is working!</h2>`)
});

//custom middleware that logs to the console the request method, request url, and a timestamp it ws requested.
function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}` //<-- What goes inside the get request here comes back undefined?
    )
    next();
  };

  module.exports = server;