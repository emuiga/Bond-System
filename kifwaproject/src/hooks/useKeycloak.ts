'use client';

import keycloakInstance from '@/lib/keycloak';
import { useEffect, useState } from 'react';

export function useKeycloak() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const updateState = () => {
      setIsAuthenticated(keycloakInstance.authenticated || false);
      setUser(keycloakInstance.tokenParsed);
    };

    // Initial state
    updateState();

    // Add event listeners
    keycloakInstance.onAuthSuccess = updateState;
    keycloakInstance.onAuthError = updateState;
    keycloakInstance.onAuthRefreshSuccess = updateState;
    keycloakInstance.onAuthRefreshError = updateState;
    keycloakInstance.onAuthLogout = updateState;

    return () => {
      // Remove event listeners
      keycloakInstance.onAuthSuccess = undefined;
      keycloakInstance.onAuthError = undefined;
      keycloakInstance.onAuthRefreshSuccess = undefined;
      keycloakInstance.onAuthRefreshError = undefined;
      keycloakInstance.onAuthLogout = undefined;
    };
  }, []);

  return {
    keycloak: keycloakInstance,
    isAuthenticated,
    user,
    logout: () => keycloakInstance.logout(),
  };
} 