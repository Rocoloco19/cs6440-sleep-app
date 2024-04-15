import React, {useEffect, useState} from 'react';
import {IObservation} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IObservation";
import connectFHIR from "../../services/FhirClient";
import {IBundle} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IBundle";

export const SleepSuggestions = () => {
  const [observations, setObservations] = useState([] as Array<IObservation>)

  const fetchData = async() => {
    const fhirClient = await connectFHIR()
    const patientId = fhirClient.patient.id;
    const observation: IBundle = await fhirClient.request(`Observation?category=activity&patient=${patientId}`);
    // const observation2: IBundle = await fhirClient.request(`Observation?patient=${patientId}`);
    // const observation1: IBundle = await fhirClient.request(`Observation?code=8480-6`);
    // const structureDefinition: IBundle = await fhirClient.request(`StructureDefinition?name=SleepStatus`);
    console.log('activity: ', observation)
    const entries = observation.entry?.map(entry => entry.resource as IObservation) || [];
    setObservations(entries);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <h1>SleepSuggestions</h1>
  );
};