import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.css';
import './styles/header.css';
import './styles/form.css';
import './styles/card.css';
import './styles/notfound.css';
import './styles/detail.css';
import './styles/register.css';
import './styles/login.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);