import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../components/Login';
import {login} from '../utils/api';
 
function LoginPages({loginSuccess, noteImage}) {
  // const navigate = useNavigate();

  async function onLogin({email, password}) {
    const { error, data } = await login({email, password});

    if(!error) {
      loginSuccess(data);
    }
  };

  return (
    <section className='login-pages'>
      <div className='login-pages-items'>
        <div>
          <img className='notes-img' src={noteImage} alt="notes" width="400"></img>
        </div>
        <div className='login-form-container'>
          <Login onLogin={onLogin} />
          <p>Kembali ke <Link to="/register">Register</Link></p> 
        </div>
      </div>
    </section>
  )
}
 
LoginPages.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  noteImage: PropTypes.string.isRequired
};

export default LoginPages;