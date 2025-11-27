#!/bin/bash

# Test script to verify Docker test setup is working
# This script can be run without sudo if your user is in the docker group

set -e

echo "======================================"
echo "Testing Docker Test Setup"
echo "======================================"
echo ""

# Check if docker is accessible
echo "1. Checking Docker access..."
if ! docker ps &> /dev/null; then
    echo "❌ Docker is not accessible without sudo."
    echo ""
    echo "Solutions:"
    echo "  A) Add your user to docker group (recommended):"
    echo "     sudo usermod -aG docker $USER"
    echo "     Then log out and log back in"
    echo ""
    echo "  B) Use sudo with docker commands:"
    echo "     sudo ./test-docker-setup.sh"
    exit 1
fi
echo "✅ Docker is accessible"
echo ""

# Check if docker compose is available
echo "2. Checking Docker Compose..."
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available"
    exit 1
fi
echo "✅ Docker Compose is available"
echo ""

# Build the test container
echo "3. Building test container..."
docker compose -f docker-compose.test.yml build test
echo "✅ Test container built successfully"
echo ""

# Run tests
echo "4. Running tests..."
echo "======================================"
docker compose -f docker-compose.test.yml run --rm test
TEST_EXIT_CODE=$?
echo "======================================"
echo ""

# Cleanup
echo "5. Cleaning up..."
docker compose -f docker-compose.test.yml down -v
echo "✅ Cleanup complete"
echo ""

# Final result
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "======================================"
    echo "✅ ALL TESTS PASSED!"
    echo "======================================"
    echo ""
    echo "You can now run tests using:"
    echo "  ./YG-server/run-tests.sh"
    echo "  or"
    echo "  cd YG-server && make test"
else
    echo "======================================"
    echo "❌ TESTS FAILED"
    echo "======================================"
    echo ""
    echo "Exit code: $TEST_EXIT_CODE"
    echo ""
    echo "Check the test output above for details."
fi

exit $TEST_EXIT_CODE
