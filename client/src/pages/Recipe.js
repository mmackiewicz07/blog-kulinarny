import React, { useEffect, useState } from 'react'
import { Header, Message, Loader, Button } from "semantic-ui-react";
import { useParams, useHistory } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import { useAuth } from '../hooks/useAuth';
import API from '../utils/API';
import MessageForm from '../components/MessageForm';

export const Recipe = () => {
  const { actions, state } = useRecipes();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const history = useHistory();
  const { isAdmin, isAuthenticated } = useAuth();
  const recipe = state.recipes.find((r) => r._id === params.id);

  const fetchComments = async () => {
    setIsLoading(true);

    try {
      const response = await API.getMessages(_id);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!recipe) {
      actions.fetch();
    }

    fetchComments();
  }, [recipe]);

  if (!recipe) {
    return <Loader size="medium" />;
  }

  const { _id, author, name, description, difficulty, duration } = recipe;

  const onEditClick = () => {
    history.push(`/edit-recipe/${_id}`);
  };

  const onRemoveClick = async () => {
    try {
      const response = await API.removeRecipe(_id);
      if (response.status === 200) {
        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Message className="message-container" size="huge" secondary="true">
        <Header size="huge">{name}</Header>
      </Message>
      <div style={{ maxWidth: '800px', padding: '30px 15px', margin: '0 auto' }}>
        <img src={`/${recipe.image}`} alt="" width="300px" style={{ display: 'block', margin: '0 auto 30px' }} />
        <strong><Header style={{ margin: '0 20px 0 0' }}>Informacje ogólne: </Header></strong>
        <div style={{ margin: '20px 0 0 0' }}>
        <span>Autor: <strong>{author}</strong></span>
        <span style={{ margin: '0 30px' }}>Stopień trudności: <strong>{difficulty} / 5</strong></span>
        <span>Czas przygotowania: <strong>{duration} min</strong></span>
        </div>
        <Header size="medium">Przygotowanie: </Header>
        <p>{description}</p>
        {isAdmin &&  (<Header size="medium">Dodaj komentarz:</Header>)}
        <div style={{ marginBottom: '20px' }}>{comments.map((comment) => (
          <p key={comment._id}><strong>{comment.author}:</strong> {comment.content}</p>
        ))}</div>

        {!isLoading && isAuthenticated && comments.length < 5 && (
          <MessageForm id={_id} onSubmit={fetchComments} />
        )}
        <div style={{ margin: '20px 0' }}>
          {isAdmin && (
            <>
              <Button color="red" style={{ margin: '0 20px 0 0' }} onClick={onRemoveClick}>
                Usuń przepis
              </Button>
              <Button primary onClick={onEditClick}>
                Edytuj przepis
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
};

export default Recipe;
