"use strict";
module.exports = {
  apps: [
    {
      name: "Smoosly",
      script: "./server/index.js",
      env: {
        NODE_ENV: "production",
        PORT: "443", //https
      },
    },
    {
      name: "Smoosly_dev",
      script: "./server/index.js",
      watch: ["server/index.js", "server/router", "server/middleware"],
      ingore_watch: ["server/log"],
      env: {
        NODE_ENV: "development",
        PORT: "443", //https
      },
    },
    {
      name: "Smoosly_local",
      script: "./server/index_local.js",
      // watch: true,
      watch: ["server/index_local.js", "server/router", "server/middleware", "server/winston.js"],
      ingore_watch: ["server/log"],
      env: {
        NODE_ENV: "development",
        PORT: "3000",
      },
    },
  ],
};
