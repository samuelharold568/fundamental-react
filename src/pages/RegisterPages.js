import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Registration from '../components/Registration';
import {register} from '../utils/api';
 
function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error, data } = await register(user);

    console.log('ini onregister', data)

    if(!error) {
      navigate('/');
    }
  };
 
  return (
    <section className='register-page-container'>
      <div className='register-page'>
        <h2>Registration</h2>
        <Registration addRegister={onRegisterHandler} />
        <p>Kembali ke <Link to="/">Login</Link></p>
      </div>
    </section>
  )
}
 
export default RegisterPage;