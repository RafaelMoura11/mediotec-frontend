import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

// Para medir a performance no app, passe uma função para logar resultados
// ou envie para um endpoint de análise. Saiba mais em: https://bit.ly/CRA-vitals
reportWebVitals();
