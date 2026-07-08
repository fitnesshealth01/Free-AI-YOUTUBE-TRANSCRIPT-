module.exports = {
  apps: [
    {
      name: "transcriptg",
      script: "dist/server.cjs",
      instances: "1", // Set to 1 for standard hosting plans to conserve memory, or "max" for high-end VPS
      exec_mode: "fork", // Use "fork" mode for standard single-instance setups, or "cluster" for multi-core scaling
      watch: false,
      autorestart: true,
      max_memory_restart: "300M", // Automatically restart if memory usage exceeds 300MB
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      error_file: "logs/pm2-error.log",
      out_file: "logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};
