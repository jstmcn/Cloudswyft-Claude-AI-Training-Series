import React from 'react';
import { createRoot } from 'react-dom/client';

// Fonts are bundled locally so the presentation works offline.
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/jetbrains-mono/400.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/chrome.css';
import './styles/scenes.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
