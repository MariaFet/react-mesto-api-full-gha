import React from 'react';
import {Link} from 'react-router-dom';

function SignUp (props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSignUp({email, password});
  }

  return (
    <div className="page">
      <h1 className="form__title">Регистрация</h1>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <input className="form__input" placeholder="Email" type="email" name="email" value={email || ''} required onChange={(e) => setEmail(e.target.value)}></input>
        <input className="form__input" placeholder="Пароль" type="password" name="password" value={password || ''} required onChange={(e) => setPassword(e.target.value)}></input>
        <button className="form__submit-button" type="submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="form__redirect-button">Уже зарегистрированы? Войти</Link>
    </div>
  )
}

export default SignUp;
