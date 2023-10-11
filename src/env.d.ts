/* eslint-disable */

interface Config {
  APP_BASE_PATH?: string;
  APP_API_PATH?: string;
  RELATIVE_FILE_ROUTE_URI?: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends Config {
    DEV: boolean;
    PROD: boolean;
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
