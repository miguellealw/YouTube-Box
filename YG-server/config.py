from os import environ, path
from dotenv import load_dotenv

baseddir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(baseddir, '.env'))


# BASE CONFIG
class Config:
  # App
  FRONTEND_SERVER = environ.get('FRONTEND_SERVER')
  FLASK_APP = environ.get('FLASK_APP')
  FLASK_ENV = environ.get('FLASK_ENV')
  API_VERSION = environ.get('API_VERSION')
  STATIC_FOLDER = 'static'

  # Server configuration for external URLs (OAuth callbacks, etc.)
  SERVER_NAME = environ.get('SERVER_NAME')
  PREFERRED_URL_SCHEME = environ.get('PREFERRED_URL_SCHEME', 'http')

  # Flask Login
  SECRET_KEY = environ.get('SECRET_KEY')
  SESSION_COOKIE_NAME = environ.get('SESSION_COOKIE_NAME')


  # DB's
  # [DB_TYPE]+[DB_CONNECTOR]://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
  SQLALCHEMY_DATABASE_URI = environ.get('DATABASE_URI')
  SQLALCHEMY_ECHO = False
  # disable warning of system resources
  SQLALCHEMY_TRACK_MODIFICATIONS = False

  # Connection pool settings for better reliability in Docker
  SQLALCHEMY_ENGINE_OPTIONS = {
    'pool_pre_ping': True,  # Verify connections before using them
    'pool_recycle': 300,    # Recycle connections after 5 minutes
    'pool_size': 10,        # Connection pool size
    'max_overflow': 20,     # Max overflow connections
    'connect_args': {
      'connect_timeout': 10,  # Connection timeout in seconds
      'options': '-c statement_timeout=30000'  # Query timeout 30s
    }
  }

  # YouTube API
  YOUTUBE_API_CLIENT_ID=environ.get("YOUTUBE_API_CLIENT_ID")
  YOUTUBE_API_CLIENT_SECRET=environ.get("YOUTUBE_API_CLIENT_SECRET")
  CLIENT_SECRET_FILENAME=environ.get("CLIENT_SECRET_FILENAME")

  # Auth0
  AUTH0_DOMAIN=environ.get("AUTH0_DOMAIN")
  ALGORITHMS=environ.get("ALGORITHMS")
  API_AUDIENCE=environ.get("API_AUDIENCE")


class ProdConfig(Config):
  FLASK_ENV = 'production'
  DEBUG = False
  TESTING = False


class DevConfig(Config):
  FLASK_ENV = 'development'
  DEBUG = True
  TESTING = True
  # FOR OAUTH TESTING
  OAUTHLIB_INSECURE_TRANSPORT = environ.get('OAUTHLIB_INSECURE_TRANSPORT')


class TestingConfig(Config):
  FLASK_ENV = 'testing'
  # DEBUG = True
  TESTING = True
  # DATABASE_URI = environ.get("TEST_DATABASE_URI")
  SQLALCHEMY_DATABASE_URI = environ.get("TEST_DATABASE_URI")
