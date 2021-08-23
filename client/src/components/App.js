import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Main from "../pages/Main";
import NewRecipe from "../pages/NewRecipe";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import UnloggedRoute from "./UnloggedRoute";
import AdminRoute from "./AdminRoute";
import Error from "../pages/Error";
import RecipeEdition from '../pages/RecipeEdition';
import { useAuth, useAuthActions } from "../hooks/useAuth";
import { Recipe } from '../pages/Recipe';

export const App = () => {
  const { token, currentUser } = useAuth();
  const { loadUser } = useAuthActions();

  useEffect(() => {
    if (token && !currentUser) {
      loadUser();
    }
  }, [token, currentUser]);

  return (
    <>
      <BrowserRouter >
        <Nav />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/recipe/:id" exact component={Recipe} />
          <UnloggedRoute path="/login" component={Login} />
          <UnloggedRoute path="/register" component={Register} />
          <PrivateRoute path="/new-recipe" component={NewRecipe} />
          <AdminRoute path="/edit-recipe/:id" component={RecipeEdition} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
