module.exports = {
  apps: [
    {
      name: "app",
      script: "build/app.js",
      instances: "max",
      exec_mode: "cluster",
      out_file: "logs/out.log",
      error_file: "logs/error.log",
      log: "logs/all.log",
      merge_logs: true,
      log_date_format: "DD-MM-YYYY",

      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
}
