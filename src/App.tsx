import './App.css';

import Layout from 'components/layout/Layout';
import WebRoutes from 'navigation/WebRoutes';
import { Provider as StoreProvider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <WebRoutes />
        </Layout>
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
