import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup (props) {
  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setPlace('');
    setLink('');
  }, [props.isOpen]);

  function handleAddPlace (evt) {
    setPlace(evt.target.value);
  }

  function handleAddLink (evt) {
    setLink(evt.target.value);
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    props.onAddPlace({place, link});
  }

  return (
    <PopupWithForm name="place" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="text" name="place" className="popup__input popup__input_type_place" placeholder="Название" required minLength="2" maxLength="30" onChange={handleAddPlace} value={place}/>
      <span className="popup__error popup__error_type_place"></span>
      <input type="url" name="link" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required onChange={handleAddLink} value={link}/>
      <span className="popup__error popup__error_type_link"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;