import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  
  function handleDeleteClick () {
    props.onCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__button-like ${isLiked && 'element__button-like_active'}`);

  return (
    <div className="element">
      <img className="element__image" alt={props.name} src={props.link} onClick={handleClick}/>
      <div className="element__info">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
          <p className="element__counter-like">{props.likes}</p>
        </div>
        {isOwn && <button className="element__button-delete" type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>}
      </div>
    </div>
  )
}

export default Card;