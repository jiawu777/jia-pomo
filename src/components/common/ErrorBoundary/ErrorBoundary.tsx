import { useTranslation } from 'react-i18next';
import Div100vh from 'react-div-100vh';
import { ErrorBoundary as ErrorBoundaryComponent } from 'react-error-boundary';

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation('common');
  return (
    <ErrorBoundaryComponent
      fallbackRender={() => {
        return (
          <Div100vh>
            <>networkErr</>
          </Div100vh>
        );
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  );
};

export default ErrorBoundary;
