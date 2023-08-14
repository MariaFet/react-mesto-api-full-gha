import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup (props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange (evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange (evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({name, about: description});
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="text" name="name" className="popup__input popup__input_type_name" placeholder="Введите имя" required minLength="2" maxLength="40" onChange={handleNameChange} value={name || ''}/>
      <span className="popup__error popup__error_type_name"></span>
      <input type="text" name="job" className="popup__input popup__input_type_job" placeholder="Введите профессию" required minLength="2" maxLength="200" onChange={handleDescriptionChange} value={description || ''}/>
      <span className="popup__error popup__error_type_job"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;