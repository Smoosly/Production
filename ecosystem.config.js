"use strict";
module.exports = {
  apps: [
    {
      name: "Smoosly",
      script: "./server/index.js",
      env: {
        NODE_ENV: "production",
        PORT: "443", //443
      },
    },
    {
      name: "Smoosly_dev",
      script: "./server/index.js",
      watch: ["server/index.js", "server/router", "server/middleware"],
      ingore_watch: ["server/log"],
      env: {
        NODE_ENV: "development",
        PORT: "443", //443
      },
    },
    {
      name: "Smoosly_local",
      script: "./server/index_local.js",
      watch: ["server/index_local.js", "server/router", "server/middleware", "server/winston.js"],
      ingore_watch: ["server/log"],
      env: {
        NODE_ENV: "development", // 배포환경시 적용될 설정 지정
        PORT: "3000", //443
      },
    },
  ],
};
