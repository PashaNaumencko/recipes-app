import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeList from '../RecipeList';
import CreateRecipe from '../CreateRecipe';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NotFound from '../../scenes/NotFound';

const Routing = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={RecipeList} />
        <Route exact path="/recipes/create" component={CreateRecipe} />
        {/* <Route exact path="/recipes/:id" component={CreateRecipe} /> */}
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
};

export default Routing;
