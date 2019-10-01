import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeList from '../RecipeList/index';
import CreateRecipe from '../CreateRecipe/index';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import NotFound from '../../scenes/NotFound/index';



const Routing = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={RecipeList} />
        <Route exact path="/recipes/create" component={CreateRecipe} />
        <Route exact path="/recipes/:id" component={CreateRecipe} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
};

export default Routing;
