# Flask 3.0 Upgrade

This document describes the changes made to upgrade the codebase to Flask 3.0 compatibility.

## Changes Made

### 1. Removed deprecated `_request_ctx_stack`

**File**: [YG_server/decorators.py](YG_server/decorators.py)

**Before**:
```python
from flask import redirect, session, _request_ctx_stack, request, abort, current_app
# ...
_request_ctx_stack.top.current_user = payload
```

**After**:
```python
from flask import redirect, session, request, abort, current_app, g
# ...
g.current_user = payload
```

**Reason**: `_request_ctx_stack` was deprecated in Flask 2.0 and removed in Flask 3.0. The recommended replacement is to use `g` (Flask's application context global) to store request-specific data.

### 2. Fixed `flask.json` import

**Before**:
```python
from flask.json import jsonify
```

**After**:
```python
from flask import jsonify
```

**Reason**: In Flask 3.0, `jsonify` was moved back to the main `flask` module.

### 3. Fixed `current_app` usage at module level

**Before**:
```python
AUTH0_DOMAIN = current_app.AUTH0_DOMAIN
ALGORITHMS = current_app.ALGORITHMS
API_AUDIENCE = current_app.API_AUDIENCE

def requires_auth(f):
    # Use AUTH0_DOMAIN, ALGORITHMS, API_AUDIENCE
```

**After**:
```python
def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Get config values from current_app context
        AUTH0_DOMAIN = current_app.config.get('AUTH0_DOMAIN')
        ALGORITHMS = current_app.config.get('ALGORITHMS')
        API_AUDIENCE = current_app.config.get('API_AUDIENCE')
        # ...
```

**Reason**: `current_app` cannot be accessed at module load time (outside of request context). These values must be retrieved inside the function where a request context exists.

## Impact

These changes make the codebase compatible with Flask 3.x while maintaining backward compatibility with Flask 2.x.

## Testing

Run the test suite to verify all functionality works:

```bash
cd /home/miguel/dev/web/YouTube-Box
./YG-server/run-tests.sh
```

Or:

```bash
cd YG-server
make test
```

## References

- [Flask 3.0 Changes](https://flask.palletsprojects.com/en/3.0.x/changes/#version-3-0-0)
- [Flask Application Context](https://flask.palletsprojects.com/en/3.0.x/appcontext/)
- [Flask `g` object](https://flask.palletsprojects.com/en/3.0.x/api/#flask.g)
