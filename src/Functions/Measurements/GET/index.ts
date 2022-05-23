//@ts-expect-error
import { connect } from 'opt/nodejs/Utilities/Connect'
import { APIGatewayProxyEvent } from 'aws-lambda'

const user = process.env.databaseUser;
const password = process.env.databasePassword;
const host = process.env.databaseHost;

const config = {
    user,
    password,
    host
}

exports.handler = async (_ : APIGatewayProxyEvent) => {
    const sql = "SELECT * FROM UNITS";
    try {
        const data = await connect(sql, config);
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
}
