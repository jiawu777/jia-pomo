import { Navigate, RouteObject, useLocation, useRoutes, useSearchParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { authTokenAtom } from '@/store';
import { ROUTES } from './routes';
import RouterList from './';

const routerList: Array<iRouter> = RouterList ? RouterList : [];

const mapRouterPath = (list: Array<iRouter>) => {
  const arr = Array.isArray(list) ? list : [];
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].children) {
      newArr.push(arr[i]);
    } else {
      const childrenArr = arr[i].children || [];
      for (let j = 0; j < childrenArr.length; j++) {
        const newObj = { ...childrenArr[j] };
        newObj.path = `${arr[i].path}/${childrenArr[j].path}`;
        newArr.push(newObj);
      }
    }
  }
  return newArr;
};

const RenderRoutes = () => useRoutes(routerList as RouteObject[]);

const RouterAuth = () => {
  const location = useLocation();
  const [query] = useSearchParams();
  const queryToken = query.get('token');
  const [token, setToken] = useAtom(authTokenAtom);
  const fromSearchRef = useRef('');

  const { pathname, search, state } = location;

  // 過濾掉token
  const regexPatternToken = /(\?|&)([^&]*token=\d+)/g;
  const filterSearch = decodeURIComponent(search).replace(regexPatternToken, '');
  const fullPath = pathname + filterSearch;

  // 從網址帶入token, 走自動登入流程並清除query token
  if (queryToken) {
    setTimeout(() => {
      setToken(queryToken);
      // refetchCache();
    }, 0);
  }

  const routerPathList = mapRouterPath(routerList);
  const targetRoute = routerPathList.find((item) => {
    if (!item.path) return;
    if (item.path === '*') return;

    if (item.path === pathname) return item;

    // 有動態路由才繼續檢查
    if (!item.path.match(/\/:\w+/g)) return;

    // 轉換動態路由的正規表達式
    const regexPattern = new RegExp('^' + item.path.replace(/\/:\w+/g, '/\\w+'));
    if (regexPattern.test(pathname)) return item;
    return;
  });

  const { needLogin } = targetRoute || {};

  // 路由改變之前，儲存原來的 Query String
  useEffect(() => {
    fromSearchRef.current = search;
  }, [pathname, search]);

  // 需登入 & 跳轉登入頁面
  if (needLogin && !token) {
    console.debug('[Render Guard] 需登入，跳轉登入頁面');
    return (
      <Navigate
        replace
        to={`${ROUTES.About}`}
        state={state}
      />
    );
  }

  console.debug('[Render Guard] 一般跳轉');
  return <RenderRoutes />;
};

export default RouterAuth;
