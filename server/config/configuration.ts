export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  database: {
    host: process.env.DATABASE_HOST || 'mongodb://mapui-mongo',
    name: process.env.DATABASE_NAME || 'mapui'
  }
});
