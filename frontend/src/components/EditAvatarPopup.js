import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditAvatarPopup (props) {
  const ref = React.useRef();

  function handleSubmit (evt) {
    evt.preventDefault();
    props.onSubmit({
      avatar: ref.current.value
    })
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="url" name="avatar" className="popup__input popup__input_type_avatar" placeholder="Ссылка на аватар" required ref={ref}/>
      <span className="popup__error popup__error_type_avatar"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;