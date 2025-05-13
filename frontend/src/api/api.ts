import { ServerAPI } from './serverApi';
import { StaticAPI } from './staticApi';

const isStatic = import.meta.env.VITE_STATIC_API === 'true';

export const API = isStatic ? new StaticAPI() : new ServerAPI();

export const baseURL = isStatic
  ? '/static-api/static'
  : 'http://localhost:8000/static';
