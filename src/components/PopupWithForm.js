import React from 'react';

const PopupWithForm = (props) => {

  return (
    <form id={`popup${props.name}`} onSubmit={props.onSubmit} className={`popup popup_half-transparent ${props.isOpen && 'popup_opened' }`} noValidate>
      <div className={`popup__form-container popup__form-container_${props.popupSize}`}>
        <button onClick={props.onClose} type="reset" className="popup__close-button" value="" />
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
      </div>
    </form>
  );
}

export default PopupWithForm;
