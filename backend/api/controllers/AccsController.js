'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const table = 'Account_user'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM Account_user'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO Account_user SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) {
                res.status(404).send({
                    message: "Thông tin tài khoản đăng kí không hợp lệ",
                  });
            }
            else{
                res.json(data)
            }
            
        })
    }
}