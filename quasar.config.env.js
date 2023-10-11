const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const fs = require('fs');

const dotenvs = [
  '.env',
  `.env.${process.env.NODE_ENV}`,
  '.env.local',
  `.env.${process.env.NODE_ENV}.local`,
];

const override = dotenvs
  .map((e) => path.resolve(process.cwd(), e))
  .reduce(
    (s, e) =>
      fs.existsSync(e)
        ? {
            ...s,
            ...(dotenv.config({
              path: e,
              override: true,
              debug: process.env.NODE_ENV === 'development',
            }).parsed ?? {}),
          }
        : s,
    {}
  );

const env = dotenvExpand.expand({
  parsed: override,
}).parsed;

module.exports = { env };
