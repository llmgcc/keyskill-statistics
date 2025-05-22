import { ServerAPI } from './serverApi';
import { StaticAPI } from './staticApi';

const isStatic = import.meta.env.VITE_STATIC_API === 'true';

export const API = isStatic ? new StaticAPI() : new ServerAPI();


function getBaseUrl() {
  const prefix = process.env.NODE_ENV === 'production' ? '/keyskill-statistics' : ''
  return isStatic
  ? `${prefix}/static-api/static`
  : 'http://localhost:8000/static';
}

export const baseURL = getBaseUrl();
