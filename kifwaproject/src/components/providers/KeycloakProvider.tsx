'use client';

import { useEffect, useState } from 'react';
import keycloakInstance from '@/lib/keycloak';

export default function KeycloakProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloakInstance.init({
          onLoad: 'login-required',
          checkLoginIframe: false,
        });
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Keycloak initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initKeycloak();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 