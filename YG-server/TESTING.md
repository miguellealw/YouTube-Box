# Testing Guide

This guide explains how to run the unit tests for YouTube-Box server using Docker.

## Prerequisites

- Docker
- Docker Compose

### Docker Permissions

If you get permission errors, add your user to the docker group:

```bash
sudo usermod -aG docker $USER
# Log out and log back in for changes to take effect
```

## First-Time Setup

### 1. Configure Test Environment

Copy the example environment file and customize it:

```bash
cp .env.test.example .env.test
```

Then edit `.env.test` with your test credentials (optional - defaults will work):

```bash
# .env.test
TEST_DB_USER=postgres
TEST_DB_PASSWORD=your_test_password_here
TEST_DB_NAME=test_db
TEST_SECRET_KEY=your_test_secret_key_here
```

**Note:** `.env.test` is in `.gitignore` and will NOT be committed to GitHub.

### 2. Verify Setup (Optional)

```bash
./test-docker-setup.sh
```

## Running Tests

### Quick Start (Recommended)

From the project root directory:

```bash
./YG-server/run-tests.sh
```

This script will:
- Build the test container
- Start an isolated test database
- Run all tests
- Clean up automatically

### Run Tests with Options

```bash
# Run with verbose output
./YG-server/run-tests.sh -v

# Run specific test file
./YG-server/run-tests.sh tests/test_auth.py

# Run specific test
./YG-server/run-tests.sh tests/test_auth.py::TestAuth::test_login

# Run tests matching a pattern
./YG-server/run-tests.sh -k test_login
```

### Direct Docker Compose (Alternative)

If you prefer to use Docker Compose directly:

```bash
# Build test container
docker compose -f docker-compose.test.yml build test

# Run all tests
docker compose -f docker-compose.test.yml run --rm test

# Run with options
docker compose -f docker-compose.test.yml run --rm test pytest -v
docker compose -f docker-compose.test.yml run --rm test pytest tests/test_auth.py

# Clean up
docker compose -f docker-compose.test.yml down -v
```

## Test Environment

The test setup includes:

- **Isolated database**: PostgreSQL container specifically for testing
- **Test configuration**: Uses `TestingConfig` from `config.py`
- **Automatic cleanup**: Database is reset between test classes
- **Docker network**: Isolated network for test services
- **Secure credentials**: Loaded from `.env.test` (not committed to git)

## Test Structure

```
tests/
├── __init__.py
├── base.py              # Base test case with setup/teardown
├── test_auth.py         # Authentication tests
├── test_category.py     # Category tests
├── test_channel.py      # Channel tests
└── test_user.py         # User tests
```

## Configuration

Test environment variables are loaded from `.env.test`:

- `TEST_DB_USER` - Test database username (default: postgres)
- `TEST_DB_PASSWORD` - Test database password (default: test_password)
- `TEST_DB_NAME` - Test database name (default: test_db)
- `TEST_SECRET_KEY` - Flask secret key for testing (default: test-secret-key)

## Security

- ✅ Credentials stored in `.env.test` (git-ignored)
- ✅ Example file `.env.test.example` committed (safe)
- ✅ Defaults provided if `.env.test` is missing
- ✅ Test database isolated from production

## Troubleshooting

### Missing .env.test file

If you haven't created `.env.test`, the tests will still run with default values. For better security, create the file:

```bash
cp .env.test.example .env.test
```

### Permission denied errors

Make sure you added yourself to the docker group and logged out/in:
```bash
sudo usermod -aG docker $USER
```

### Tests fail to connect to database

The health check should handle this automatically. If issues persist, try:
```bash
docker compose -f docker-compose.test.yml down -v
docker compose -f docker-compose.test.yml build --no-cache test
```

### Clean everything

```bash
docker compose -f docker-compose.test.yml down -v
docker system prune -f
```

## CI/CD Integration

You can easily integrate this into CI/CD pipelines. Set the environment variables in your CI system:

```bash
# In your CI script
export TEST_DB_USER=postgres
export TEST_DB_PASSWORD=ci_password
export TEST_DB_NAME=test_db
export TEST_SECRET_KEY=ci_secret_key

docker compose -f docker-compose.test.yml run --rm test
```

The command will exit with code 0 on success, non-zero on failure.
