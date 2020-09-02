import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeList from '../RecipeList';
import RecipeForm from '../RecipeForm';
import RecipePage from '../RecipePage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NotFound from '../../scenes/NotFound';

const Routing = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={RecipeList} />
        <Route exact path="/create" component={RecipeForm} />
        <Route exact path="/:id" component={RecipePage} />
        <Route exact path="/edit/:id" component={RecipeForm} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
};

export default Routing;
