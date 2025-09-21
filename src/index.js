import React from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './components/Home/Home';


import App from './App';



const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <App/>
  </>
);


