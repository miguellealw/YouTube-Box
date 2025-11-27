#!/bin/bash

# Script to run tests using Docker Compose
# Usage: ./run-tests.sh [pytest-args]

set -e

cd "$(dirname "$0")/.."

echo "🧪 Running tests with Docker Compose..."
echo ""

# Build and run tests
docker compose -f docker-compose.test.yml build test
docker compose -f docker-compose.test.yml run --rm test "$@"

# Cleanup
echo ""
echo "🧹 Cleaning up..."
docker compose -f docker-compose.test.yml down -v

echo ""
echo "✅ Done!"
