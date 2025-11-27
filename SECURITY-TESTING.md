# Test Environment Security

## Overview

Test credentials are now stored securely and NOT committed to GitHub.

## Files

### Committed to GitHub ✅
- `.env.test.example` - Template with example values
- `docker-compose.test.yml` - References environment variables
- `.gitignore` - Excludes sensitive files

### NOT Committed (Git-Ignored) ⛔
- `.env.test` - Your actual test credentials
- `.env` - Production environment variables
- `pg.env` - Production database credentials

## Setup for New Developers

When someone clones your repo, they need to:

```bash
# Copy example file
cp .env.test.example .env.test

# (Optional) Edit with custom values
nano .env.test
```

## What's Protected

The following credentials are now in `.env.test` (git-ignored):

- `TEST_DB_USER` - Test database username
- `TEST_DB_PASSWORD` - Test database password
- `TEST_DB_NAME` - Test database name
- `TEST_SECRET_KEY` - Flask secret key for testing

## Default Values

If `.env.test` doesn't exist, these defaults are used:
- User: `postgres`
- Password: `test_password`
- Database: `test_db`
- Secret: `test-secret-key`

## GitHub Safety Checklist

Before pushing to GitHub, verify:

- ✅ `.env.test` is in `.gitignore`
- ✅ `.env.test.example` has safe example values
- ✅ No hardcoded credentials in `docker-compose.test.yml`
- ✅ `docker-compose.test.yml` uses `${VARIABLE}` syntax

## CI/CD Usage

In your CI/CD pipeline, set environment variables:

```yaml
# Example GitHub Actions
env:
  TEST_DB_USER: postgres
  TEST_DB_PASSWORD: ${{ secrets.TEST_DB_PASSWORD }}
  TEST_DB_NAME: test_db
  TEST_SECRET_KEY: ${{ secrets.TEST_SECRET_KEY }}
```

Then run:
```bash
docker compose -f docker-compose.test.yml run --rm test
```

## Verify It's Working

Check what will be committed:
```bash
git status
git add -n .  # Dry run to see what would be added
```

Make sure `.env.test` is NOT listed!
