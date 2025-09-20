# Docker Deployment Guide

This guide covers how to run the Todo List application using Docker and Docker Compose.

## Prerequisites

- Docker
- Docker Compose
- Git

## Environment Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file with your configurations:**
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://postgres:password@db:5432/todolist"
   
   # Session Security - CHANGE THIS IN PRODUCTION!
   COOKIE_SECRET="your-super-secret-cookie-string-here-change-in-production"
   
   # Application URLs
   BASE_URL="http://localhost:3000"
   
   # Optional Webhooks
   WEBHOOK_URL=""
   DISCORD_WEBHOOK_URL=""
   DISCORD_BOT_NAME="kovacs"
   
   # Docker/Development specific
   POSTGRES_USER="postgres"
   POSTGRES_PASSWORD="password"
   POSTGRES_DB="todolist"
   ```

## Running with Docker Compose

### Production Mode

```bash
# Start the application in production mode
docker-compose --profile production up -d

# View logs
docker-compose logs -f web

# Stop the application
docker-compose down
```

### Development Mode

```bash
# Start the application in development mode with hot reload
docker-compose --profile development up -d

# View logs
docker-compose logs -f web-dev

# Stop the application
docker-compose down
```

### Default Mode (Production)

```bash
# Start just the database and production web server
docker-compose up -d
```

## Building and Running Manually

### Build the Docker Image

```bash
docker build -t todolist .
```

### Run with External Database

```bash
docker run -d \
  --name todolist-app \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:password@host:5432/database" \
  -e COOKIE_SECRET="your-secret" \
  -e BASE_URL="http://localhost:3000" \
  todolist
```

### Run with Docker Compose Database

```bash
# Start just the database
docker-compose up -d db

# Run the app manually
docker run -d \
  --name todolist-app \
  --network todo-list_default \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://postgres:password@db:5432/todolist" \
  -e COOKIE_SECRET="your-secret" \
  -e BASE_URL="http://localhost:3000" \
  todolist
```

## Production Deployment

### 1. GitHub Secrets Setup

Set the following secrets in your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub token/password
- `HOST`: Production server hostname/IP
- `USERNAME`: SSH username for production server
- `KEY`: SSH private key for production server

### 2. Production Server Setup

On your production server:

```bash
# Clone the repository
git clone <your-repo-url>
cd todo-list

# Create and configure .env file
cp .env.example .env
nano .env  # Edit with production values

# Create production docker-compose override (optional)
cat > docker-compose.prod.yml << EOF
version: '3.8'
services:
  web:
    image: your-dockerhub-username/todolist:latest
  db:
    volumes:
      - /var/lib/postgresql/data:/var/lib/postgresql/data
EOF

# Deploy
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 3. Automated Deployment

The GitHub Actions workflow will:

1. Run tests on every push to master
2. Build and test the Docker image
3. Deploy automatically on master branch pushes (when configured)

## Database Management

### View Database

```bash
# Access Prisma Studio
docker-compose exec web yarn prisma studio

# Or use psql directly
docker-compose exec db psql -U postgres -d todolist
```

### Backup Database

```bash
# Create a backup
docker-compose exec db pg_dump -U postgres todolist > backup.sql

# Restore from backup
docker-compose exec -T db psql -U postgres -d todolist < backup.sql
```

### Reset Database

```bash
# Reset and migrate
docker-compose exec web yarn prisma migrate reset
```

## Troubleshooting

### Common Issues

1. **Container fails to start:**
   ```bash
   # Check logs
   docker-compose logs web
   
   # Check container status
   docker-compose ps
   ```

2. **Database connection issues:**
   ```bash
   # Verify database is healthy
   docker-compose exec db pg_isready -U postgres -d todolist
   
   # Check network connectivity
   docker-compose exec web ping db
   ```

3. **Permission denied on entrypoint.sh:**
   ```bash
   # Rebuild the image
   docker-compose build --no-cache web
   ```

### Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f web
docker-compose logs -f db

# Last N lines
docker-compose logs --tail=50 web
```

### Clean Up

```bash
# Stop and remove containers
docker-compose down

# Remove volumes (WARNING: This will delete your data!)
docker-compose down -v

# Clean up images
docker image prune -f
```

## Performance Considerations

1. **Resource Limits:**
   Add resource limits to docker-compose.yml:
   ```yaml
   services:
     web:
       deploy:
         resources:
           limits:
             memory: 1G
             cpus: '0.5'
   ```

2. **Health Checks:**
   Already configured for database. Add for web service:
   ```yaml
   services:
     web:
       healthcheck:
         test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
         interval: 30s
         timeout: 10s
         retries: 3
   ```

3. **Scaling:**
   ```bash
   # Scale web service
   docker-compose up -d --scale web=3
   ```