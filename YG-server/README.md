# Instructions on how to set up project
### API's 
---
* Auth0
	* Instructions in [client readme](https://github.com/miguellealw/YouTube-Box/tree/main/yg-client)
* [YouTube Data API](https://developers.google.com/youtube/v3/guides/authentication)
	* [How to get auth credentials](https://developers.google.com/youtube/registering_an_application)
		* Get YouTube client ID
		* Get YouTube client secret
		* Download client secret file from google console and store in root of YG-server
	* [Using API Keys](https://cloud.google.com/docs/authentication/api-keys)
---
### Set up environment variables
* Frontend
	* `FRONTEND_SERVER` - the address of frontend server. In this case it is `http://localhost:3000`
* API
	* `API_VERSION` - version of api
* Flask
	* `FLASK_APP` - name of script that will start app (youtubebox.py)
	* `FLASK_ENV` - environment var specifying development, testing, production
	* `SECRET_KEY` - generate using `python -c 'import os; print(os.urandom(16))'`
	* `SESSION_COOKIE_NAME` - random string of chars
* Database
	* `DATABASE_URI`=`postgresql://postgres:<PASSWORD>@localhost:5432/<DB_NAME>`
		* Local or Production DB
		*	If you are using `docker-compose up` the host will be `db` instaed of `localhost`

	* `TEST_DATABASE_URI`=`postgresql://postgres:<PASSWORD>@localhost:5432/<DB_NAME>`
		* DB for testing
* YouTube API
	* `YOUTOUBE_API_CLIENT_ID` - client ID for YouTube API. Generate from google console.  * `YOUTUBE_API_CLIENT_SECRET` - client Secret for YouTube API. Generate from google console.
	* `CLIENT_SECRET_FILENAME` - client secret JSON file from YouTube API. Generate and download from google console.
* OAuth
	* `OAUTHLIB_INSECURE_TRANSPORT=1` - YouTube google oauth library does not let *non-https* sites access API. Since localhost is *http*, enable insecure transport. **Disable in production**
* Auth0
	* `AUTH0_DOMAIN`- The auth0 applications tenant domain. (W/out `https://`)
	* `ALGORITHMS=["RS256"]`- the algorithms used to encode tokens
	* `API_AUDIENCE` - The API application identifier

Example:
```
# API
FRONTEND_SERVER=http://localhost:3000
API_VERSION=v1.0

# Sessions
SECRET_KEY=...
SESSION_COOKIE_NAME=...

# Flask
FLASK_APP=youtubebox.py
FLASK_ENV=development # or production or testing

# DB's
# For dev and prod
DATABASE_URI=postgresql://postgres:<password>@localhost:5432/<DB NAME>
TEST_DATABASE_URI=postgresql://postgres:<password>@localhost:5432/<DB NAME>

# YouTube API
YOUTUBE_API_CLIENT_ID=...
YOUTUBE_API_CLIENT_SECRET=...
CLIENT_SECRET_FILENAME=...
# only in dev
OAUTHLIB_INSECURE_TRANSPORT=1

# Auth0
AUTH0_DOMAIN=...
ALGORITHMS=["RS256"]
API_AUDIENCE=...
```
---

### How to set up virtual environment
- Set up virtual env on Windows
	- **Create venv**
		- Go to the project folder and run `py -m venv venv`. This will create a folder with the name `venv`
	- **Activate venv**
	Some may work, some may not depending on the OS. For Git Bash on Windows the 3rd option works.
		- `<name of venv>/Scripts/activate.bat` 
		- or `. <name of venv>/Scripts/activate` 
		- or `source <name of venv>/Scripts/activate`
	- **Deactivate venv**
		- `deactivate`
	- **Remove venv**
		- `rmdir <venv name> /s`

---

### How to install deps in venv
* `pip install -r requirements.txt`
--- 

### How to set up db and run migrations
1. Create Database in Postgres
2. Run Migrations using [Flask Migrate](https://flask-migrate.readthedocs.io/en/latest/)
	* `flask db upgrade` against the empty db
	* more info [here](https://blog.miguelgrinberg.com/post/how-to-add-flask-migrate-to-an-existing-project)

---

### Start flask server: 
- Git Bash in Windows: `source venv/Scripts/activate`
- run `flask run`

---
### How to run tests
* TODO

---
### Deployment
- Set up environment variables. Instructions above.
	- Make sure to set `FLASK_ENV` to `production` so the proper config is loaded
---
### Other Notes
- After installing dependency do `pip freeze > requirements.txt` to add to requirements.txt file
