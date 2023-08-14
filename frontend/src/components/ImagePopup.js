function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__wrapper">
        <figure className="popup__image-container">
          <img className="popup__image" src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""}/>
          <figcaption className="popup__image-description">{props.card ? props.card.name : ""}</figcaption>
        </figure>
        <button className="popup__button-close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </section>
  )
};

export default ImagePopup;