import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import './css/normalize.css';
import './css/global.css';
import './css/album.css';
import './css/song-row.css';
import './css/library.css';
import './css/landing.css';
import './css/player_bar.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById(('root'))
);
registerServiceWorker();
