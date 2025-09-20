#!/bin/sh
set -e

echo "Starting entrypoint script..."
echo "DATABASE_URL: $DATABASE_URL"

# Function to run migrations with retry
run_migrations_with_retry() {
  echo "Running database migrations with retry logic..."
  
  for i in $(seq 1 10); do
    echo "Migration attempt $i/10..."
    
    if yarn prisma migrate deploy; then
      echo "Migrations completed successfully!"
      return 0
    fi
    
    echo "Migration attempt $i failed. Error details above."
    
    if [ $i -eq 10 ]; then
      echo "ERROR: Migrations failed after 10 attempts"
      echo "Final attempt - trying to show more debug info:"
      yarn prisma migrate status || true
      exit 1
    fi
    
    echo "Retrying migration in 10 seconds..."
    sleep 10
  done
}

# Add delay to let database fully start
echo "Waiting 15 seconds for database to be fully ready..."
sleep 15

# Run migrations with retry
run_migrations_with_retry

echo "Starting the application..."
exec yarn start
