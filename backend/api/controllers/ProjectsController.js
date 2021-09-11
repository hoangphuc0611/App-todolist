"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("../db");
const table = "Project";

module.exports = {
  get: (req, res) => {
    let sql = "SELECT * FROM Project";
    db.query(sql, (err, response) => {
      if (err) {
        throw err;
      }
      res.json(response);
    });
  },
  detail: (req, res) => {
    let sql = "SELECT * FROM Project WHERE project_ID = ?";
    db.query(sql, [req.params.projectId], (err, response) => {
      if (err) throw err;
      res.json(response[0]);
    });
  },
  update: (req, res) => {
    let data = req.body;
    let projectId = req.params.projectId;
    let sql = "UPDATE Project SET ? WHERE project_ID = ?";
    db.query(sql, [data, projectId], (err, response) => {
      if (err) throw err;
      res.json({ message: "Update success!" });
    });
  },
  updates: (req, res) => {
    let data = req.body["dataupdate"];
    data.forEach((element) => {
      let sql = "UPDATE Task SET ? WHERE project_ID = ?";
      db.query(sql, [element, element["project_ID"]], (err, response) => {});
    });
    res.json({ message: "Update success!" });
  },
  store: (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO Project SET ?";
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
    });
    let sql1 =
      "select * from Project having project_ID order by project_ID desc limit 1";
    db.query(sql1, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  delete: (req, res) => {
    let sql = "DELETE FROM Project WHERE project_ID = ?";
    db.query(sql, [req.params.projectId], (err, response) => {
      if (err) throw err;
      res.json({ message: "Delete success!" });
    });
  },
};
