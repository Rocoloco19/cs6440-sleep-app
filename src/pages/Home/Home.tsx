import React, {useEffect, useState} from 'react';
import {ICondition} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/ICondition";
import {IGoal} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IGoal";
import connectFHIR from "../../services/FhirClient";
import {IBundle} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IBundle";
import {ICarePlan} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/ICarePlan";
import {Card, CardContent, Typography} from "@mui/material";
// import {IObservation} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IObservation";
// import connectFHIR from "../../services/FhirClient";
// import {IBundle} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IBundle";

export const Home = () => {
  const [carePlan, setCarePlan] = useState([] as Array<ICarePlan>)

  const fetchData = async() => {
    const fhirClient = await connectFHIR()
    const patientId = fhirClient.patient.id;
    const response: IBundle = await fhirClient.request(`CarePlan?patient=${patientId}`);
    console.log('response: ', response)
    const responseEntries = response.entry?.map(entry => entry.resource as ICarePlan) || [];

    setCarePlan(responseEntries);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <br/>
      <h3>Care Plans:</h3>
      {
        carePlan.length > 0 ? (
          carePlan.map(plan => {
            return (
              <Card className='card-container'>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Start Date: {(plan.period?.start || '').toString() || 'N/A'}
                  </Typography>
                  <Typography variant="h6">
                    Category: {plan.category && plan.category[0]?.text}
                  </Typography>
                  <Typography variant="body2" component="div">
                    ID: {plan.id}
                  </Typography>
                </CardContent>
              </Card>
            )
          })
        ) : <p>No Care Plans found</p>
      }
    </>
  );
};