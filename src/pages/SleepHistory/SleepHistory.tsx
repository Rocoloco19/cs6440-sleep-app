import React, {useEffect, useState} from 'react';
import connectFHIR from "../../services/FhirClient";
import {IObservation} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IObservation";
import {IBundle} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IBundle";
import {Card, CardContent, Typography} from "@mui/material";
import './SleepHistory.css';

export const SleepHistory = () => {
  const [observations, setObservations] = useState([] as Array<IObservation>)
  const fetchData = async() => {
    const fhirClient = await connectFHIR()
    const patientId = fhirClient.patient.id;
    const observation: IBundle = await fhirClient.request(`Observation?category=vital-sign&patient=${patientId}`);
    const observation2: IBundle = await fhirClient.request(`Observation?patient=${patientId}`);
    const observation1: IBundle = await fhirClient.request(`Observation?code=8480-6`);
    const structureDefinition: IBundle = await fhirClient.request(`StructureDefinition?name=SleepStatus`);
    console.log('structureDefinition: ', structureDefinition)
    const entries = observation2.entry?.map(entry => entry.resource as IObservation) || [];
    setObservations(entries);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>SleepHistory</h1>
      {
        observations.map(observation => {
          return (
            <Card className='card-container'>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Date: {observation.effectiveDateTime}
                </Typography>
                <Typography variant="h5" component="div">
                  ID: {observation.id}
                </Typography>
                <Typography variant="body2">
                  Text: {observation.code?.text}
                </Typography>
              </CardContent>
            </Card>
          )
        })
      }
    </>
  );
};