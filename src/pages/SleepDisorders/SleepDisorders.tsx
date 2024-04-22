import React, {useEffect, useState} from 'react';
import {Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import {IObservation} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IObservation";
import connectFHIR from "../../services/FhirClient";
import {IBundle} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IBundle";
import * as ObservationCategory from '../../data/CodeSystem/ObservationCategory';
import { GridColDef } from '@mui/x-data-grid';
import {causes} from './causes';
import {Table} from "../../common/Table/TableComponent";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 170 },
  { field: 'description',
    headerName: 'Description',
    width: 430,
  },
  { field: 'effectiveDateTime', headerName: 'Effective Date Time', width: 230 },
];

interface Observation extends IObservation {
  description: string;
}

export const SleepDisorders = () => {
  const [observations, setObservations] = useState([] as Array<Observation>)
  const [selectedDisorder, setSelectedDisorder] = useState('None')
  const [observationCategory, setObservationCategory] = useState('');

  const fetchData = async() => {
    const fhirClient = await connectFHIR()
    const patientId = fhirClient.patient.id;
    const data: IBundle = await fhirClient.request(`Observation?category=${observationCategory}&patient=${patientId}`);
    const entries = data.entry?.map((entry) => {
      const resource = entry.resource as IObservation;
      return {
        ...resource,
        description: resource.code.text || 'N/A',
      };
    }) || [];
    setObservations([...entries]);
  };

  useEffect(() => {
    fetchData();
  }, [observationCategory, selectedDisorder]);

  const handleChange = (event: SelectChangeEvent) => {
    setObservationCategory(event.target.value as string)
  };

  const selectChip = (cause: string) => {
    setSelectedDisorder(cause);
  }

  return (
    <>
      <h1>SleepDisorders</h1>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Observation Category</InputLabel>
        <Select
          labelId="observation-category-select-label"
          id="observation-category-select"
          label="ObservationCategory"
          onChange={handleChange}
        >
          {
            ObservationCategory && ObservationCategory.data.concept.map(category => (
              <MenuItem value={category.code}>{category.display}</MenuItem>
            ))
          }
        </Select>
        <br/>
        <Stack direction="row" spacing={1}>
          {
            causes.map(cause => {
              const colorTag = selectedDisorder === cause ? 'success' : 'default';
              return <Chip
                label={cause}
                style={{cursor: 'pointer'}}
                onClick={() => selectChip(cause)}
                color={colorTag}
              />
            })
          }
        </Stack>
        <br/>
        <Table
          title={'Results'}
          columns={columns}
          rows={observations}
          filterModel={{
            items: [{ field: 'description', operator: 'contains', value: selectedDisorder === 'None' ? '' : selectedDisorder }],
          }}
        />
      </FormControl>
    </>
  );
};