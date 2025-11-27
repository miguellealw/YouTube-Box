# Quick Start - Running Tests

## One-Time Setup

### 1. Docker Permissions
Add your user to the docker group:
```bash
sudo usermod -aG docker $USER
```

Then **log out and log back in** for the changes to take effect.

### 2. Configure Test Credentials (Optional)

Copy the example file and customize if desired:
```bash
cp .env.test.example .env.test
```

**Note:** This step is optional. Tests will work with defaults if you skip it.

## Running Tests

### Basic Usage

From the project root:
```bash
./YG-server/run-tests.sh
```

That's it! The script will:
- Build the test container
- Start the test database
- Run all tests
- Clean up automatically

### Common Options

```bash
# Verbose output
./YG-server/run-tests.sh -v

# Specific test file
./YG-server/run-tests.sh tests/test_auth.py

# Specific test
./YG-server/run-tests.sh tests/test_auth.py::TestAuth::test_login

# Run tests matching a pattern
./YG-server/run-tests.sh -k test_login
```

## What Gets Tested?

- ✅ Authentication (login, logout, registration)
- ✅ User management
- ✅ Categories
- ✅ Channels

All tests run in an isolated Docker environment with their own test database.

## Security

- ✅ Test credentials in `.env.test` (git-ignored)
- ✅ Safe to push to GitHub
- ✅ Example file `.env.test.example` shows format

## Troubleshooting

**Problem**: Permission denied errors with Docker
**Solution**: Make sure you added yourself to the docker group and logged out/in

**Problem**: Want to start fresh
**Solution**: `docker compose -f docker-compose.test.yml down -v`
