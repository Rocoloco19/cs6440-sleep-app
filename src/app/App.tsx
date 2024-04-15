import React, {useEffect, useState} from 'react';
import './App.css';
import {Outlet} from 'react-router-dom';
import {IPatient} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IPatient";
import {SidePanel} from "../common/SidePanel/SidePanel";
import {Navigator} from "../common/Navigator/Navigator";
import connectFHIR from "../services/FhirClient";

function App () {
  const [patient, setPatient] = useState({} as IPatient)
  const fetchData = async() => {
    const fhirClient = await connectFHIR()
    const patient: IPatient = await fhirClient.request(`Patient/${fhirClient.patient.id}`);
    setPatient(patient);
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
        <SidePanel patient={patient}/>
      </section>
      <div id='content'>
        <Outlet />
      </div>
    </>
  );
};

export default App;