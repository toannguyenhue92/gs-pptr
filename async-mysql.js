const mysql = require('mysql');

const connect = async (params) =>
    new Promise((resolve, reject) => {
        const connection = mysql.createConnection(params);
        connection.connect((error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(connection);
        });
    });

const query = async (conn, q, params) =>
    new Promise((resolve, reject) => {
        const handler = (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        };
        conn.query(q, params, handler);
    });

module.exports = { connect, query };
