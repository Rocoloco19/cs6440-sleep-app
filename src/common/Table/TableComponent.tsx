import React, {useEffect, useState} from 'react';
import connectFHIR from "../../services/FhirClient";
import {IBundle} from "@smile-cdr/fhirts/dist/FHIR-R4/interfaces/IBundle";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {GridFilterModel} from "@mui/x-data-grid/models/gridFilterModel";

interface TableProps {
  title: string;
  columns: GridColDef[];
  resourceType?: string;
  rows?: Array<any>;
  filterModel?: GridFilterModel;
}

export const Table: React.FC<TableProps> = (
  {title, columns, resourceType, rows, filterModel}) => {
  const [data, setData] = useState([] as Array<any>)

  const fetchData = async() => {
    const fhirClient = await connectFHIR()
    const patientId = fhirClient.patient.id;
    const data: IBundle = await fhirClient.request(`${resourceType}?patient=${patientId}`);
    const dataEntries = data.entry?.map(d => d.resource) || [];
    console.log('data: ', data)
    setData(dataEntries);
  };

  useEffect(() => {
    if (rows !== undefined) {
      setData([...rows]);
    } else {
      fetchData();
    }
  }, [rows]);

  return (
    <>
      <h3>{title}</h3>
      <div style={{ width: '100%' }}>
        {
          data.length > 0 ? (
            <DataGrid
              rows={data}
              columns={columns}
              filterModel={filterModel}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              style={{minHeight: 180}}
            />
          ) : <p>No data</p>
        }
      </div>
    </>
  );
};