import React from 'react'
import { ItemFromList } from './ItemFromList';

export const RecipeList = ({ recipes }) => {
  return (
    <div style={{ padding: '0 0 30px' }}>
      {recipes.map(recipe => (
        <ItemFromList key={recipe._id} {...recipe} />
      ))}
    </div>
  )
};

export default RecipeList;
