export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
  },
  api: {
    baseUrl:
      process.env.API_HOST || `http://localhost:${process.env.PORT || 3000}`,
  },
  sessionToken: {
    expiration: '1h',
  },
  app: {
    baseUrl: process.env.FRONTEND_HOST || `http://localhost:4200`,
  },
  analytics: {
    visitCooldown: 1, // In Hours
  },
});
