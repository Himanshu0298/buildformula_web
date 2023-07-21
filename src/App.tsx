import './App.css';

import Layout from 'components/layout/Layout';
import WebRoutes from 'navigation/WebRoutes';
import { Provider as StoreProvider } from 'react-redux';
import { store } from 'redux/store';
function App() {
  return (
    <StoreProvider store={store}>
      <Layout>
        <WebRoutes />
      </Layout>
    </StoreProvider>
  );
}

export default App;
