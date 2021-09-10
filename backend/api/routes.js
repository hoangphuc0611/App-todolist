'use strict';
const jwt = require('jsonwebtoken')
const util = require('util')
const mysql = require('mysql')
const db = require('./db')
const { application } = require('express');

module.exports = function (app) {
  var projectsCtrl = require('./controllers/ProjectsController');
  var messsCtrl = require('./controllers/MessagesController');
  var taskCtrl = require('./controllers/TasksController');
  var accCtrl = require('./controllers/AccsController');
  var authenToken = require('./middleware/auth');



  app.get('/projects', projectsCtrl.get);

  app.post('/login', (req, res) => {
    const data = req.body;
    var accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10h'
    });

    let sql = 'SELECT * FROM Account_user where username=? and passwd=?'
    var x = 0;
    db.query(sql, [data.username, data.passwd], (err, response) => {

      if (response.length) {
        res.json({ accessToken });
        console.log(response[0])
      }
      else {
        res.status(403).send({
          message: "Sai taikhoan hoac matkhau",
        });
      }
    });
  });
  app.use(authenToken.isAuth);
  app.post('/projects', projectsCtrl.store);
  app.put('/projects', projectsCtrl.updates);


  app.route('/projects/:projectId')
    .get(projectsCtrl.detail)
    .put(projectsCtrl.update)
    .delete(projectsCtrl.delete);

  // todoList Routes

  app.get('/accs', accCtrl.get);
  app.post('/accs', accCtrl.store);


  app.route('/messages')
    .get(messsCtrl.get)

  app.route('/messages/:projectId')
    .get(messsCtrl.detail)
    .post(messsCtrl.store);


  app.route('/tasks')
    .get(taskCtrl.get)


  app.route('/tasks/:projectId')
    .get(taskCtrl.details)
    .post(taskCtrl.store)
    .put(taskCtrl.updates);

  app.route('/tasks/:projectId/:taskId')
    .get(taskCtrl.detail)
    .put(taskCtrl.update)
    .delete(taskCtrl.delete);

};
