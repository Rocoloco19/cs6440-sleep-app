import React from 'react';
import {GridColDef} from "@mui/x-data-grid";
import {Table} from "../../common/Table/TableComponent";
import {InfoCard, InfoCardProps} from "../../common/InfoCard/InfoCard";
import './SleepSuggestions.css';

const conditionsColumns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 170 },
  {
    field: 'text',
    headerName: 'Description',
    width: 430,
    valueGetter: (params) => params.row?.code?.text,
  },
  {
    field: 'verificationStatus',
    headerName: 'Status',
    valueGetter: (params) => params.row?.verificationStatus?.coding[0]?.code,
  },
  { field: 'recordedDate', headerName: 'Recorded Date', width: 230 },
];

const immunizationColumns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 170 },
  {
    field: 'vaccineCode',
    headerName: 'Vaccine Code',
    width: 430,
    valueGetter: (params) => params.row?.vaccineCode?.text,
  },
  {
    field: 'status',
    headerName: 'Status',
  },
  { field: 'occurrenceDateTime', headerName: 'Date', width: 230 },
];

const diagnosticColumns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 170 },
  {
    field: 'text',
    headerName: 'Description',
    width: 430,
    valueGetter: (params) => params.row?.code?.text,
  },
  {
    field: 'status',
    headerName: 'Status',
  },
  { field: 'issued', headerName: 'Date', width: 230 },
];

const sleepSuggestions: Array<InfoCardProps> = [
  {
    linkSource: "MedlinePlus",
    title: "Sleep Suggestions",
    description: "Sleep causes, disorders, and more",
    hrefLink: "https://medlineplus.gov/sleepdisorders.html",
    linkLabel: "More Info",
  },
  {
    linkSource: "Sleep Foundation",
    title: "Better You",
    description: "Information for a better sleep",
    hrefLink: "https://www.sleepfoundation.org/",
    linkLabel: "More Info",
  },
  {
    linkSource: "National Sleep Foundation",
    title: "Be Your",
    description: "Leading authority in sleep health",
    hrefLink: "https://www.thensf.org/",
    linkLabel: "More Info",
  }
]

export const SleepSuggestions = () => {

  return (
    <>
      <h1>SleepSuggestions</h1>
      <br/>
      <h3>Useful Sleep Resources </h3>
      <div className={"suggestion-container"}>
        {
          sleepSuggestions.map(suggestion => (
            <InfoCard {...suggestion}/>
          ))
        }
      </div>
      <br/>
      In order to get an accurate state for sleeping suggestions please consider the following resume of different categories:
      <br/>
      <Table
        title={'Conditions'}
        columns={conditionsColumns}
        resourceType={'Condition'}
      />
      <Table
        title={'Allergy Intolerance'}
        columns={conditionsColumns}
        resourceType={'AllergyIntolerance'}
      />
      <Table
        title={'Diagnostic Report'}
        columns={diagnosticColumns}
        resourceType={'DiagnosticReport'}
      />
      <Table
        title={'Immunization'}
        columns={immunizationColumns}
        resourceType={'Immunization'}
      />
    </>
  );
};