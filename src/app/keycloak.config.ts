import {
    provideKeycloak,
    createInterceptorCondition,
    IncludeBearerTokenCondition,
    INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    withAutoRefreshToken,
    AutoRefreshTokenService,
    UserActivityService
  } from 'keycloak-angular';
  
  
  const APICondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /^(http:\/\/localhost:5206)(\/.*)?$/i
  })
  
  export const provideKeycloakAngular = () =>
    provideKeycloak({
      config: {
        realm: 'keycloak-angular-sandbox',
        url: 'http://localhost:8080',
        clientId: 'keycloak-angular'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        redirectUri: window.location.origin + '/'
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'logout',
          sessionTimeout: 120000
        })
      ],
      providers: [
        AutoRefreshTokenService,
        UserActivityService,
        {
          provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
          useValue: [APICondition]
        }
      ]
    });
  