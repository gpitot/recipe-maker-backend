//@ts-expect-error
import { connect } from '/opt/nodejs/Utilities/Connect'

const config = {
    user: process.env.databaseUser,
    password: process.env.databasePassword,
    host: process.env.databaseHost,
    database: process.env.databaseName
}


enum Table { 
    ingredients = 'ingredients',
    recipes = 'recipes',
    units = 'units',
    recipe_ingredients = 'recipe_ingredients'
}

type Query = {
    table : Table;
    recipe_id? : number;
}

exports.handler = async (query : Query) => {
    const { table, recipe_id } = query;

    let sql;
    let params : any[] = [];
    switch (table) {
        case Table.ingredients:
            sql = 'select * from ingredients;';
            break;

        case Table.recipes:
            sql = 'select * from recipe_meta;';
            break;

        case Table.units:
            sql = 'select * from units;';
            break;

        case Table.recipe_ingredients:
            sql = 'select ingredient, amount from recipe_ingredients where recipe_id = ?;'
            params = [recipe_id]
            break;

        default:
            return Promise.reject({
                success : false,
                err : "No table given"
            })
    }


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
