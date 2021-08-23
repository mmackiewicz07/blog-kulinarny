import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import { RecipeList } from '../components/RecipeList';
import { useRecipes } from '../hooks/useRecipes';
import { GiCakeSlice } from 'react-icons/gi';

export const Main = () => {
  const { actions, state } = useRecipes();

  useEffect(() => {
    actions.fetch();
  }, []);

  return (
    <div>
      <Message className="message-container" size="medium" secondary="true">
        <Header size="huge"><GiCakeSlice /> Przepisy na każdą okazję !</Header>
      </Message>

      <RecipeList recipes={state.recipes} />
    </div>
  )
};

export default Main;
