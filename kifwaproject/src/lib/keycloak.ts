import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8081',
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'kifwa',
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT || 'kifwa-react-app'
};

const keycloakInstance = new Keycloak(keycloakConfig);

export default keycloakInstance; 