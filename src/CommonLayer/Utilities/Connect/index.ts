//import {captureMySQL} from 'aws-xray-sdk';
import mysql from 'mysql2';

// const mysql = captureMySQL(mysql2)


type Config = {
    user : string;
    password : string;
    host : string;
    database: string;
}

type Props = {
    sql : string;
    config : Config;
    params? : any[];
}

export const connect = async ({sql, params=[], config} : Props) => {
    const connection = mysql.createConnection(config);
    connection.connect();
    try {
        const [results] = await connection.promise().query(sql, params);
        connection.end();
        return Promise.resolve(results);
    } catch (err) {
        return Promise.reject(err);
    }
}
