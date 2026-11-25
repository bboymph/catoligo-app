// Expõe API_URL (definida no .env) ao app via Constants.expoConfig.extra.
module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    apiUrl: process.env.API_URL,
  },
});
