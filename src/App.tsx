import './App.css';
import NavBar from './components/NavBar';
import axios from 'axios'
import {useQuery} from 'react-query'
import Form from './components/Form';
import {useEffect, useState } from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from 'gapi-script'

function App() {

  return (
    <>
    <NavBar/>
    <Form />
   
    
    </>
  );
}

export default App;