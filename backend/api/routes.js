"use strict";
const jwt = require("jsonwebtoken");
const util = require("util");
const mysql = require("mysql");
const db = require("./db");
const { application } = require("express");
// const {fetch} = require('node-fetch') ;
// const axios = require('axios');
const superagent = require("superagent");
module.exports = function (app) {
  var projectsCtrl = require("./controllers/ProjectsController");
  var messsCtrl = require("./controllers/MessagesController");
  var taskCtrl = require("./controllers/TasksController");
  var accCtrl = require("./controllers/AccsController");
  var authenToken = require("./middleware/auth");
  app.get("/projects", projectsCtrl.get);

  app.post("/login", async (req, res) => {
    const user = req.body;
    var accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    const api_url = `https://0ogw1vj2tg.execute-api.ap-southeast-1.amazonaws.com/accs/`;
    let fetch_response = await superagent.get(api_url);
    let jsons = JSON.parse(fetch_response["text"]);
    let temp = false;
    let response;
    jsons.forEach((element) => {
      if (
        element["username"] === user.username &&
        element["passwd"] === user.passwd
      ) {
        temp = true;
        response = element;
      }
    });
    if (temp) {
      res.json({ accessToken, response });
    } else {
      res.status(403).send({
        message: "Sai tai khoan hoac mat khau",
      });
    }
  });

  app.post("/accs", async (req, res) => {
    const user = req.body;
    const api_url = `https://0ogw1vj2tg.execute-api.ap-southeast-1.amazonaws.com/accs/`;
    const fetch_response = await superagent
      .post(api_url)
      .send({ username: user.username, passwd: user.passwd, img: user.img })
      .set("X-API-Key", "foobar")
      .set("accept", "json");
    const re = JSON.parse(fetch_response["text"]);
    if (re?.username) {
      res.status(200).send({
        success: true,
        message: "Tạo tài khoản thành công",
      });
    } else {
      if (re.status === 404) {
        res.status(404).send({
          success: false,
          message: "Tài khoản đã tồn tại",
        });
      } else {
        res.status(403).send({
          success: false,
          message: "Tạo tài khoản không thành công",
        });
      }
    }
  });

  app.use(authenToken.isAuth);
  app.post("/projects", projectsCtrl.store);
  app.put("/projects", projectsCtrl.updates);

  app
    .route("/projects/:projectId")
    .get(projectsCtrl.detail)
    .put(projectsCtrl.update)
    .delete(projectsCtrl.delete);

  // todoList Routes

  app.route("/messages").get(messsCtrl.get);

  app.route("/messages/:projectId").get(messsCtrl.detail).post(messsCtrl.store);

  app.route("/tasks").get(taskCtrl.get);

  app
    .route("/tasks/:projectId")
    .get(taskCtrl.details)
    .post(taskCtrl.store)
    .put(taskCtrl.updates);

  app
    .route("/tasks/:projectId/:taskId")
    .get(taskCtrl.detail)
    .put(taskCtrl.update)
    .delete(taskCtrl.delete);
};
