import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/User.context';
import { FooterProvider } from './context/Footer.context';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FooterProvider>
          <App />
        </FooterProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
