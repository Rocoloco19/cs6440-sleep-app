import FHIR from "fhirclient"
FHIR.oauth2.authorize({
    "client_id": "my_web_app",
    "scope": "patient/*.read"
});