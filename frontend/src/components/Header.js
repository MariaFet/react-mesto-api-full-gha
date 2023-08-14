import headerLogo from '../images/logo.svg';
import {Link, Routes, Route} from 'react-router-dom';

function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" alt="Логотип Mesto Russia" src={headerLogo}/>
      <Routes>
        <Route exact path="/" element={
          <div className="header__button-wrapper">
            <p className="header__button">{props.email}</p>
            <Link to="/sign-in" className="header__button" onClick={props.signOut}>Выйти</Link>
          </div>} />
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__button">Войти</Link>} />
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__button">Регистрация</Link>} />
      </Routes>
    </header>
  );
}

export default Header;