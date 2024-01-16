import React ,{ useState }from 'react'
// import './App.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import Loader from './features/components/Loader';
import ContactForm from './features/components/ContactForm';
import ContactList from './features/components/ContactList';


function App() {

  return (
    <>
    <Provider store={store}>
      <PersistGate loading={<Loader/>} persistor={persistor}>
      <h1>Contact App</h1>
        <ContactForm />
        <ContactList />
      </PersistGate>
    </Provider>
    </>
  )
}

export default App
