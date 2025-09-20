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

## Health Checks

The application includes health checks for the database to ensure proper startup order.