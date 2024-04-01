import React from 'react';
import './SidePanel.css';
import { IfhirR4 } from '@smile-cdr/fhirts';

interface SidePanelData {
  patient: IfhirR4.IPatient;
}

export const SidePanel = (props: SidePanelData) => {
  const {patient} = props;
  const fullName = `${patient?.name?.at(0)?.given?.at(0)} ${patient?.name?.at(0)?.family}` || '';


  return (
    <div className='container'>
      <h1>{fullName}</h1>
      <div className='row'>{`Id: ${patient?.id || 'N/A'}`}</div>
      <div className='row'>{`Active: ${patient?.active || 'N/A'}`}</div>
      <div className='row'>{`Birthdate: ${patient?.birthDate}`}</div>
      <div className='row'>{`Gender: ${patient?.gender}`}</div>
    </div>
  );
};