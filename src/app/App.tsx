import React from 'react';
import FHIR from "fhirclient"
// import logo from '../logo.svg';
import './App.css';
import {APP_NAME} from "../common/utils/constants";

FHIR.oauth2.ready()
    .then(client => client.request("Patient"))
    .then(console.log)
    .catch(console.error);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {APP_NAME}
      </header>
    </div>
  );
}

export default App;
