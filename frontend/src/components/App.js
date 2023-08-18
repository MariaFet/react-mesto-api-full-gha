import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import {useNavigate, Link, Routes, Route, Navigate} from 'react-router-dom';
import Login from './Login.js';
import SignUp from './SignUp.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import InfoToolTip from './InfoToolTip.js';
import * as auth from '../utils/Auth.js';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
 
  React.useEffect(() => {
    handleTokenCheck();
  }, [])

  function handleTokenCheck () {
    //const token = localStorage.getItem('jwt');
    const userId = localStorage.getItem('userId');
    if (userId) {
      auth.checkToken(userId)
      .then((res) => {
        //if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', {replace: true});
        //}
      })
      .catch(err => console.log(err));
    }
  }
  
  function handleSignIn ({password, email}) {
    auth.signIn({password, email})
    .then((data) => {
      setLoggedIn(true);
      setEmail(email);
      navigate('/', {replace: true});
    })
    .catch((err) => {
      setIsInfoToolTipOpen(true);
      setIsSuccessInfoTooltipStatus(false);
      console.log(err);
    });
  }

  function handleSignUp ({password, email}) {
    auth.signUp({password, email})
    .then((res) => {
      setIsSuccessInfoTooltipStatus(true);
      setIsInfoToolTipOpen(true);
      navigate('/sign-in', {replace: true});
    })
    .catch((err) => {
      console.log(err);
      setIsSuccessInfoTooltipStatus(false);
      setIsInfoToolTipOpen(true);
    })
  }


  function signOut () {
    localStorage.removeItem('userId');
    navigate('/sign-in', {replace: true});
    setLoggedIn(false);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(()=> {
    if (loggedIn) {
      api.getUserInfo()
      .then((res) => {setCurrentUser(res)})
      .catch(err => console.log(err))
    }
  }, [loggedIn])

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch(err => console.log(err));
    }
  }, [loggedIn])

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups () {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
    } else {
      api.deleteLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
    }
  }

  function handleCardDelete (card) {
    api.deleteCard (card._id)
    .then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch(err => console.log(err)); 
  }
  
  function handleUpdateUser (data) {
    api.editUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  function handleUpdateAvatar (data) {
    api.editAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} signOut={signOut} />
        <Routes>
          <Route exact path="/" element={<ProtectedRouteElement element={Main} loggedIn={loggedIn} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />}></Route>
          <Route path="/sign-in" element={<Login handleSignIn={handleSignIn}/>}></Route>
          <Route path="/sign-up" element={<SignUp handleSignUp={handleSignUp}/>}></Route>
          <Route path="/*" element={loggedIn ? <Navigate to="/" replace/> : <Navigate to="/sign-in" replace/>} />
        </Routes>
        <InfoToolTip isOpen={isInfoToolTipOpen} isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus} onClose={closeAllPopups} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar}/>
        <PopupWithForm name="confirmation" title="Вы уверены?" buttonText="Да" />
        <Footer />
      </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;