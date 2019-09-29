import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeList from '../RecipeList/index';
import CreateRecipe from '../CreateRecipe/index';
import RecipePage from '../RecipePage/index';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';



const Routing = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={RecipeList} />
        <Route exact path="/recipes/page/:id" component={RecipePage} />
        <Route exact path="/recipes/create" component={CreateRecipe} />
        <Route exact path="/recipes/:id" component={CreateRecipe} />
      </Switch>
      <Footer />
    </>
  );
};

export default Routing;
