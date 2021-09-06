'use strict';
module.exports = function(app) {
  var projectsCtrl = require('./controllers/ProjectsController');
  var messsCtrl = require('./controllers/MessagesController');
  var taskCtrl = require('./controllers/TasksController');
  // todoList Routes
  app.route('/projects')
    .get(projectsCtrl.get)
    .post(projectsCtrl.store)
    .put(projectsCtrl.updates);


  app.route('/projects/:projectId')
    .get(projectsCtrl.detail)
    .put(projectsCtrl.update)
    .delete(projectsCtrl.delete);

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
