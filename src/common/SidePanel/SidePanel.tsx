import React from 'react';
import './SidePanel.css';

interface SidePanelData {
  fullName: string;
}

export const SidePanel = (props: SidePanelData) => {
  const {fullName} = props;
  return (
    <div className='container'>
      <h1>{fullName}</h1>
    </div>
  );
};