export const routeResolver = (filePath: string) => {
  return [
    process.env.RELATIVE_FILE_ROUTE_URI ?? process.env.APP_BASE_PATH,
    '/',
    filePath,
  ]
    .filter(Boolean)
    .join('');
};
