module.exports = {
  DEVELOPMENT: {
    SECRET: "Iamthesecret",
    DATABASE: "mongodb://localhost:27017/dev_ooberdb",
    PORT: 3001
  },
  TESTING: {
    SECRET: "Iamthesecret",
    DATABASE: "mongodb://localhost:27017/test_ooberdb",
    PORT: 3002
  },
  STAGING: {
    SECRET: "Iamthesecret",
    DATABASE: "mongodb://localhost:27017/staging_ooberdb",
    PORT: 3003
  },
  PRODUCTION: {
    SECRET: "Iamthesecret",
    DATABASE: "mongodb://localhost:27017/prod_ooberdb",
    PORT: 3000
  }
};
