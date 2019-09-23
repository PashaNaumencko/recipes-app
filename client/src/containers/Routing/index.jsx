import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeList from '../RecipeList/index';


const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={RecipeList} />
    </Switch>
  );
};

export default Routing;
