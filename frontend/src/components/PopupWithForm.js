function PopupWithForm (props) {

    return(
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ""}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} action="URL" method="get" name={`${props.name}`} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__button-submit">{props.buttonText}</button>
        </form>
        <button className="popup__button-close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </section>
    );
};

export default PopupWithForm;
