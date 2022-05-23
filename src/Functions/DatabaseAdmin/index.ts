//@ts-expect-error
import { connect } from '/opt/nodejs/Utilities/Connect'

const config = {
    user: process.env.databaseUser,
    password: process.env.databasePassword,
    host: process.env.databaseHost,
    database: process.env.databaseName
}


type Query = {
    sql : string;
    params?: any[];
}

exports.handler = async (query : Query) => {
    const { sql, params } = query;
    try {
        const data = await connect({sql, params, config});
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject({
            success: false,
            err
        });
    }
}
