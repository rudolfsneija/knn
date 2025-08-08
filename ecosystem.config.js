module.exports = {
  apps: [{
    name: 'knn-api',
    script: './dist/api/server.js',
    cwd: '/var/www/knn',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    
    // Auto restart settings
    max_restarts: 10,
    restart_delay: 5000,
    
    // Memory management
    max_memory_restart: '500M',
    
    // Monitoring
    monitoring: false
  }]
};
