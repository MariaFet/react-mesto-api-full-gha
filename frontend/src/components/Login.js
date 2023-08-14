import React from 'react';

function Login (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange (e) {
    setPassword(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (!email || !password) {
      return
    }
    props.handleSignIn({password, email});
  }

  return (
    <div className="page">
      <h1 className="form__title">Вход</h1>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <input className="form__input" placeholder="Email" type="email" name="email" required value={email || ''} onChange={handleEmailChange}></input>
        <input className="form__input" placeholder="Пароль" type="password" name="password" required value={password || ''} onChange={handlePasswordChange}></input>
        <button className="form__submit-button" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;