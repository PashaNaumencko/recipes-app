import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeList from '../RecipeList/index';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';


const Routing = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={RecipeList} />
      </Switch>
      <Footer />
    </>
  );
};

export default Routing;
