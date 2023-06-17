import React, {useState} from "react";
import PropTypes from 'prop-types';

function Registration(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tesPassword, setTesPassword] = useState("");
  const [password, setPassword] = useState('');

  function onNameChange(e) {
    setName(e.target.value);
  };

  function onEmailChange(e) {
    setEmail(e.target.value);
  };

  function  onPasswordChange(e) {
    setTesPassword(e.target.value);
  };

  function  onConfirmPasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleSubmitRegistration(e) {
    e.preventDefault();

    if(password !== tesPassword) {
      alert('password must be same')
      return;
    }
    props.addRegister({name, email, password});
  };

  return (
    <React.Fragment>
      <section className='form-register-container'>
        <form className='form-register' onSubmit={handleSubmitRegistration}>
          <input type="text" placeholder="Nama" value={name} onChange={onNameChange} />
          <input type="email" placeholder="Email" value={email} onChange={onEmailChange} />
          <input type="password" placeholder="Password" autoComplete='current-password' value={tesPassword} onChange={onPasswordChange} />
          <input type="password" placeholder='Confirm Password' value={password} onChange={onConfirmPasswordChange} />
          <button className="btn-register">REGISTER</button>
        </form>
      </section>
    </React.Fragment>
  );
};

Registration.propTypes = {
  addRegister: PropTypes.func.isRequired,
}

export default Registration;
