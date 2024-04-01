import FHIR from 'fhirclient';
import Client from "fhirclient/lib/Client";

let client: Client;

const connectFHIR = async () => {
  if (client) {
    return client;
  }
  return await FHIR.oauth2.ready();
};

export default connectFHIR;
