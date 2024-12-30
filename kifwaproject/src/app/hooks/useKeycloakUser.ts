import keycloakInstance from '@/lib/keycloak';

export const useKeycloakUser = () => {
  const username = keycloakInstance.tokenParsed?.preferred_username || '';
  const firstName = keycloakInstance.tokenParsed?.given_name || '';
  const lastName = keycloakInstance.tokenParsed?.family_name || '';
  const email = keycloakInstance.tokenParsed?.email || '';

  // Capitalize first letter of a string
  const capitalize = (str: string) => 
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // Get the second part of the username if it contains a dot, otherwise use the full username
  const displayName = username.includes('.') 
    ? capitalize(username.split('.')[1])
    : capitalize(username);

  return {
    username,
    firstName,
    lastName,
    email,
    displayName
  };
}; 