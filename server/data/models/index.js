const orm = require('../db/connection');
const associate = require('../db/associations');

const Recipe = orm.import('./recipe');
const Step = orm.import('./step');
const Ingredient = orm.import('./ingredient');

associate({
    Recipe,
    Step,
    Ingredient
});

module.exports = {
    RecipeModel: Recipe,
    StepModel: Step,
    IngredientModel: Ingredient
};
