module.exports = {
  apps: [
    {
      name: 'saral-pooja-api',
      script: './backend/server.js',
      cwd: '/var/www/saral-pooja',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      error_file: '/var/log/pm2/saral-pooja-error.log',
      out_file: '/var/log/pm2/saral-pooja-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
