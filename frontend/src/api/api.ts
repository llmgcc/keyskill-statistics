import { ServerAPI } from './serverApi';
import { StaticAPI } from './staticApi';

const isStatic = import.meta.env.VITE_STATIC_API === 'true';

export const API = isStatic ? StaticAPI : ServerAPI;

function getBaseUrl() {
  const prefix = process.env.NODE_ENV === 'production' ? '' : '';
  return isStatic
    ? `${prefix}/static-api/static`
    : 'http://localhost:8000/static';
}

export const baseURL = getBaseUrl();
