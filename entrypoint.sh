#!/bin/sh
set -e

echo "Running database migrations..."
yarn prisma migrate deploy

echo "Starting the application..."
exec yarn start