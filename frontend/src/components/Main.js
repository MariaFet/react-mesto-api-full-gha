import api from '../utils/Api.js';
import Card from './Card.js';
import React from 'react';
import ReactDOM from 'react-dom';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {
  
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper" onClick={props.onEditAvatar}>
          <img className="profile__avatar" alt="Аватар пользователя" src={currentUser.avatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__box">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => {
          return <Card key={card._id} card={card} name={card.name} link={card.link} likes={card.likes.length} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
        })
        }
      </section>
    </main>
  );
}

export default Main;