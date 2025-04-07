const APIBasePathArr = import.meta.env.VITE_APP_API_PATH
  ? import.meta.env.VITE_APP_API_PATH.split(',')
  : [];
const SocketBasePath = import.meta.env.VITE_APP_SOCKET_PATH
  ? import.meta.env.VITE_APP_SOCKET_PATH
  : '';

export { APIBasePathArr, SocketBasePath };
