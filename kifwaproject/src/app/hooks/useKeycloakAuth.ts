import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useKeycloakAuth = () => {
  const { keycloak, initialized } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [keycloak, initialized]);

  return {
    isAuthenticated: keycloak.authenticated,
    isLoading: !initialized,
    user: keycloak.tokenParsed,
    logout: keycloak.logout,
  };
};