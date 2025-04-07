import { Suspense, lazy, useMemo } from 'react';
import queryString from 'query-string';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from './routes';

const loadPage = (id: string) => {
  const Page = lazy(() => import(`@/pages/${id}`));
  return (
    <Suspense fallback={<></>}>
      <Page />
    </Suspense>
  );
};

const RouterList: Array<iRouter> = [
  {
    path: ROUTES.About,
    element: loadPage('About'),
    needLogin: false,
  },
  {
    path: ROUTES.Policy,
    element: loadPage('Policy'),
    needLogin: false,
  },
  {
    path: '/',
    element: (
      <Navigate
        replace
        to={ROUTES.About}
      />
    ),
    needLogin: true,
  },
  {
    path: '*',
    element: (
      <Navigate
        replace
        to={ROUTES.About}
      />
    ),
    needLogin: true,
  },
];

export default RouterList;
export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate() as any;

  return useMemo(() => {
    return {
      push: navigate.push,
      replace: navigate.replace,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      location,
      navigate,
    };
  }, [params, location, navigate]);
}
