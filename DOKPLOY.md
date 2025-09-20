# Dokploy Deployment Guide

This application is configured for deployment with Dokploy using the included `docker-compose.yml`.

## Required Environment Variables

Dokploy needs to provide the following environment variables:

### Database Configuration
- `POSTGRES_USER` - PostgreSQL username (default: `postgres`)
- `POSTGRES_PASSWORD` - PostgreSQL password (required)
- `POSTGRES_DB` - Database name (default: `todolist`)

### Application Configuration
- `COOKIE_SECRET` - Secret for session cookies (required)
- `BASE_URL` - Base URL of your application (e.g., `https://your-domain.com`)

### Optional Configuration
- `WEBHOOK_URL` - General webhook URL (optional)
- `DISCORD_WEBHOOK_URL` - Discord webhook for notifications (optional)
- `DISCORD_BOT_NAME` - Discord bot name (default: `Workload Watchdog`)

## Deployment Steps

1. **Create a new project** in Dokploy
2. **Set the repository**: `https://github.com/qwamicodes/gremix-remix`
3. **Configure environment variables** in Dokploy with the values above
4. **Deploy using Docker Compose** mode
5. **Set up domain** pointing to port `2288`

## Docker Images

- **Database**: `postgres:16-alpine`
- **Application**: `ghcr.io/qwamicodes/gremix-remix:latest`

## Volumes

- `postgres_data` - Persistent PostgreSQL data storage

## Startup Process

The application includes retry logic in the entrypoint script to handle database connectivity issues:

1. **Wait 15 seconds** for database to be fully ready
2. **Run migrations** with up to 10 retry attempts
3. **Start the application**

## Troubleshooting

### "Can't reach database server" Error

If you see `P1001: Can't reach database server at db:5432`, this usually means:

1. **Database not ready**: The PostgreSQL container takes time to initialize
2. **Network issues**: Container networking in Dokploy might need time to establish
3. **Environment variables**: Check that all required env vars are set correctly

**Solution**: The updated entrypoint script includes automatic retry logic that should resolve this.

### Alternative Deployment

If the main `docker-compose.yml` doesn't work, try using `docker-compose.dokploy.yml` which has a simplified configuration without health checks.
