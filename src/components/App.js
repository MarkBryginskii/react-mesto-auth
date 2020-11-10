import React from 'react';
import logo from './images/header-logo.svg';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';

import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup';

import appApi from '../utils/Api.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

const App = () => {

  const [currentUser, setCurrentUser] = React.useState('');

  React.useEffect( () => {
    appApi.getUserInfo()
    .then((userData) => {
        setCurrentUser(userData);
      });
    }, []);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    (isLiked ? appApi.removeCardLike(card._id) : appApi.addCardLike(card._id))
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }

  const handleCardDelete = (card) => {
    appApi.deleteCard(card._id)
    .then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    });
  }

  React.useEffect( () => {
    appApi.getInitialCards()
    .then((cards) => {
      setCards(cards);
      });
    }, []);

  const [selectedCard, setSelectedCard] = React.useState();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  const handleUpdateUser = ({name, about}) => {
    appApi.setUserInfo({name, about})
    .then((userData) => {
      console.log(userData);
      setCurrentUser(userData);})
      .then(() => {closeAllPopups()});
  }

  const handleUpdateAvatar = ({avatar}) => {
    appApi.setUserAvatar({avatar})
    .then((userData) => {
      setCurrentUser(userData);})
      .then(() => {closeAllPopups()});
  }

  const handleAddPlaceSubmit = ({name, link}) => {
    appApi.addCard({name, link})
    .then((newCard) => {
      setCards([...cards, newCard]);
    })
    .then(() => {closeAllPopups()});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header logo={logo} />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLikeClick={handleCardLike}
          onCardDeleteClick={handleCardDelete}
        />
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit}/>
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
