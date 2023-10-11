export type appConfig = Nullable<{
  maxAgeForQuote: number
}>


export const getAppConfig: () => appConfig = () => {
  return {
    maxAgeForQuote: process.env.MAX_AGE_FOR_QUOTE ? +process.env.MAX_AGE_FOR_QUOTE : null
  }
};
