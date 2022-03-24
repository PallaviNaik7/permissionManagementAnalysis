module.exports = {
  apps: [
    {
      name: "Permission-Management-Analysis",
      script: "app.js",
      autorestart: true,
      append_env_to_name: true,
      watch: false,
      max_memory_restart: "1G",
      env_production: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "ubuntu",
      host: "13.234.76.203",
      ref: "origin/master",
      repo: "git@github.com:mrinq/access_control_management.git",
      path: "/home/ubuntu/access_control_management",
      "post-deploy":
        "npm install && node_modules/.bin/sequelize db:migrate --env production && pm2 reload ecosystem.config.js --env production",
    },
  },
};
