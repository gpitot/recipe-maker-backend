import {captureMySQL} from 'aws-xray-sdk';
import mysql2 from 'mysql2/promise';
import { APIGatewayProxyEvent } from 'aws-lambda'

// @ts-expect-error
const mysql = captureMySQL(mysql2)
const user = process.env.databaseUser
const password = process.env.databasePassword
const host = process.env.databaseHost

exports.handler = async (query : APIGatewayProxyEvent) => {
    const sql = query.body;;
    const connection = mysql.createConnection({
        host,
        user,
        password,
        database : 'lambdadb'
    })
    connection.connect()
    try {
        const data = await connection.query(sql!);
        connection.end();
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
}
