"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../db");
const table = "Message";

module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM Message";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  detail: (req, res) => {
    let sql = "SELECT * FROM Message WHERE project_ID = ? ";
    db.query(sql, [req.params.projectId], (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },

  store: (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO Message SET ?";
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Insert success!" });
    });
  },
};
