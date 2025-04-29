import { ServerAPI } from './serverApi';
import { StaticAPI } from './staticApi';

export const API =
  import.meta.env.VITE_STATIC_API === 'true'
    ? new StaticAPI()
    : new ServerAPI();
