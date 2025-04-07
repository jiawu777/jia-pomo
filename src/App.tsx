import { HashRouter } from 'react-router-dom';
import RouterAuth from '@/router/RouterAuth';
import { StatusProvider, GlobalProvider } from '@/store';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const App = () => {
  return (
    <StatusProvider>
      <ErrorBoundary>
        <GlobalProvider>
          <HashRouter>
            <RouterAuth />
          </HashRouter>
        </GlobalProvider>
      </ErrorBoundary>
    </StatusProvider>
  );
};

export default App;
