import FHIR from 'fhirclient';
import Client from "fhirclient/lib/Client";

let client: Client;

const connectFHIR = async () => {
  if (client) {
    return client;
  }
  client = await FHIR.oauth2.ready();
  return  client;
};

export default connectFHIR;
