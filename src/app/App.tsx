import React, {useEffect, useState} from 'react';
import FHIR from 'fhirclient'
import './App.css';
import {Outlet} from 'react-router-dom';
import {Navigator} from "../common/Navigator/Navigator";
import {SidePanel} from "../common/SidePanel/SidePanel";

function App () {
  const [patientFullName, setPatientFullName] = useState('');
  const fetchData = async() => {
    const client = await FHIR.oauth2.ready();
    const data = await client.request(`Patient/${client.patient.id}`);
    const fullName = `${data?.name[0]?.given[0]} ${data?.name[0]?.family}` || '';
    console.log(data)
    setPatientFullName(fullName);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div id='nav'>
        <Navigator />
      </div>
      <section id='sidepanel'>
        <SidePanel fullName={patientFullName}/>
      </section>
      <div id='content'>
        <Outlet />
      </div>
    </>
  );
};

export default App;