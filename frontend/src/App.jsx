import React from 'react';
import { Admin, CustomRoutes, Resource, memoryStore } from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import PodLoginPage from './pages/PodLoginPage/PodLoginPage';

import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import i18nProvider from './config/i18nProvider';
import * as resources from './resources';

import RedirectPage from './pages/RedirectPage';

const customPodProviders = import.meta.env.VITE_POD_PROVIDER_DOMAIN_NAME && [
  { 'apods:domainName': import.meta.env.VITE_POD_PROVIDER_DOMAIN_NAME, 'apods:area': 'Local' }
];

const LoginPage = props => <PodLoginPage customPodProviders={customPodProviders} {...props} />;

const App = () => (
  <BrowserRouter>
    <Admin
      title={import.meta.env.VITE_APP_NAME}
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={LoginPage}
      store={memoryStore()}
      requireAuth
    >
      {Object.entries(resources).map(([key, resource]) => (
        <Resource key={key} name={key} {...resource.config} />
      ))}
      <CustomRoutes noLayout>
        <Route path="/r" element={<RedirectPage />} />
      </CustomRoutes>
    </Admin>
  </BrowserRouter>
);

export default App;
