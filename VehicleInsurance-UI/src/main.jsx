import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './state/state.js'

// PrimeReact CSS imports (Place them here)
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// PrimeReact Provider (good practice)
import { PrimeReactProvider } from 'primereact/api';
createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
  <Provider store={store}>
    <App /> 
    </Provider>
  </PrimeReactProvider>
)
