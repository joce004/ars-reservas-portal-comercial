/**
 * Returns an absolute URL for an asset given a relative path.
 * @param {string} path Relative path of the asset.
 * @returns {string} Absolute URL of the asset.
 */
export const getAssetUrl = (path: string) =>
  new URL(`/src/assets/${path}`, import.meta.url).href;
