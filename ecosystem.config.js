module.exports = {
  apps: [{
    name: "webhook-timesheet",
    script: "./index.js",
    env_development: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
}
