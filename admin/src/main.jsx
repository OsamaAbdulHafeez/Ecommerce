import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
)
