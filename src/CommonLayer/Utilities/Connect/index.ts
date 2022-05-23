//import {captureMySQL} from 'aws-xray-sdk';
import mysql from 'mysql2/promise';

// const mysql = captureMySQL(mysql2)


type Config = {
    user : string;
    password : string;
    host : string;
}

export const connect = async (sql : string, config: Config) => {
    try {
        console.log('GUILLAUME CONFIG ', config, process.env.databaseUser);
        const connection = await mysql.createConnection({
            ...config,
            database : 'lambdadb'
        });
        console.log('GUILLAUME CONNECTION', connection);
        connection.connect();
        const data = await connection.query(sql);
        connection.end();
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
}
