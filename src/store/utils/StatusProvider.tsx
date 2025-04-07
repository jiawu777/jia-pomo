import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClientAtom } from 'jotai-tanstack-query';
import { Provider as JotaiProvider, createStore } from 'jotai';
import { storageRetryAtom } from '@/store';
import { APIBasePathArr } from '@/constants/common';
import { HydrateAtomsProvider } from './HydrateAtomsProvider';

const retryTimes = import.meta.env.VITE_APP_RETRY_TIMES
  ? Number(import.meta.env.VITE_APP_RETRY_TIMES)
  : 3;
const retryDelay = import.meta.env.VITE_APP_RETRY_DELAY
  ? Number(import.meta.env.VITE_APP_RETRY_DELAY) * 1000
  : 5000;

const store = createStore();
const updateIndex = () => {
  const maxLimit = APIBasePathArr.length;
  const newIndex = Math.floor(Math.random() * maxLimit);
  store.set(storageRetryAtom, newIndex);
};
const StatusProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: retryTimes,
        retryDelay: (attemptIndex) => {
          if (attemptIndex === retryTimes) {
            updateIndex();
          }
          return retryDelay;
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        console.error('queryCache onError', error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.error('mutationCache onError', error);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider store={store}>
        <HydrateAtomsProvider initialValues={[[queryClientAtom, queryClient]]}>
          {children}
        </HydrateAtomsProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export { store, StatusProvider };
