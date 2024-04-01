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
    const data: IBundle = await fhirClient.request(`Observation`);
    const entries = data.entry?.map(entry => entry.resource as IObservation) || [];
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