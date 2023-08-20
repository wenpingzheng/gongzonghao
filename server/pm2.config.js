module.exports = {
  apps: [
    {
      name: 'gzh',
      script: './dist/app.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      cwd: './',
      env: {
        NODE_ENV: 'production',
      },
      instance: 1,
      exec_mode: 'cluster'
    },
  ],
};
