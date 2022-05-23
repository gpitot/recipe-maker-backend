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

type Query = RecipeInsert | IngredientsInsert | RecipeIngredientInsert;

type RecipeInsert = {
    table : Table.recipes;
    params : [string, string];
}

type IngredientsInsert = {
    table : Table.ingredients;
    params : [string, string];
}

type RecipeIngredientInsert = {
    table : Table.recipe_ingredients;
    params : [string, number]
}



exports.handler = async (query : Query) => {
    const { table, params } = query;

    let sql;

    switch (table) {
        case Table.ingredients:
            sql = 'insert into ingredients (name, unit) values (?, ?);';
            break;

        case Table.recipes:
            sql = 'insert into recipe_meta (name, description) values (?, ?);';
            break;

        case Table.recipe_ingredients:
            sql = 'insert into recipe_ingredients (name, amount) values (?, ?);'
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
