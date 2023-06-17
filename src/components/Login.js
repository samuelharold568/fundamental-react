import React, { useState } from "react";
import PropTypes from 'prop-types';

function Login({onLogin}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function onEmailChange(e) {
    setEmail(e.target.value);
  };

  function onPasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleSubmitLogin(e) {
    e.preventDefault();

    onLogin({email, password});
  };

  return (
    <div className="login-container">
      <section className='login-title'>
        <h1>Login</h1>
      </section>
      <section className="sec">
        <form onSubmit={handleSubmitLogin} className='login-input'>
          <input type="email" placeholder='Email' value={email} onChange={onEmailChange} />
          <input type="password" placeholder='Password' value={password} onChange={onPasswordChange} />
          <button className="btn-login">Masuk</button>
        </form>
      </section>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;