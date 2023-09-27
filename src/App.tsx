import { ThemeProvider } from '@mui/material/styles';
import Layout from 'components/layout/Layout';
import WebRoutes from 'navigation/WebRoutes';
import { Provider as StoreProvider } from 'react-redux';
import { store } from 'redux/store';
import theme from 'Theme';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <Layout>
          <WebRoutes />
        </Layout>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
