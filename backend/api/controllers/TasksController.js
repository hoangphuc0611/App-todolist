'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const table = 'Task'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM Task'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    details: (req, res) => {
        let sql = 'SELECT * FROM Task WHERE project_ID = ?'
        db.query(sql, [req.params.projectId], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM Task WHERE project_ID = ? and task_ID=?'
        db.query(sql, [req.params.projectId, req.params.taskId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let projectId = req.params.projectId;
        let sql = 'UPDATE Task SET ? WHERE task_ID = ?'
        db.query(sql, [data, req.params.taskId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    updates: (req, res) => {
        let data = req.body["dataupdate"];
        let projectId = req.params.projectId;
        data.forEach(element => {
            let sql = 'UPDATE Task SET ? WHERE task_ID = ?'
            db.query(sql, [element, element["task_ID"]], (err, response) => {
            
        })})
        res.json({message: 'Update success!'})
        
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO Task SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
        })
        let sql1 = 'select * from Task having task_ID order by task_ID desc limit 1'
        db.query(sql1, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM Task WHERE task_ID = ?'
        db.query(sql, [req.params.taskId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}