import { KeycloakTokenParsed } from 'keycloak-js';

declare module 'keycloak-js' {
  interface KeycloakTokenParsed {
    name?: string;
    preferred_username?: string;
    email?: string;
    // Add any other custom claims you expect from your Keycloak server
  }
}