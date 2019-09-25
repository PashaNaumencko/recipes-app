const orm = require('../db/connection');
const associate = require('../db/associations');

const Recipe = orm.import('./recipe');
const Step = orm.import('./step');

associate({
    Recipe,
    Step
});

module.exports = {
    RecipeModel: Recipe,
    StepModel: Step
};
