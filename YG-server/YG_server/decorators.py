from functools import wraps
from flask import redirect, session, _request_ctx_stack, request, abort, current_app
from flask.json import jsonify
from YG_server.auth.oauth import get_authenticated_service

# For requires_auth
from YG_server import AuthError
import json
# from six.moves.urllib.request import urlopen
from urllib.request import urlopen
from jose import jwt

############### YOUTUBE ###############
def yt_auth_required(f):
	@wraps(f)
	def route_handler(*args, **kwargs):
		# Check if user is authed by youtube
		if 'credentials' not in session:
			# TODO: handle this properly. send json message to frontend and have frontend handle redirection
			return abort(401, "You are not authorized with YouTube")
			# return redirect('auth.authorize')

		yt_client = get_authenticated_service()
		return f(yt_client, *args, **kwargs)
	return route_handler


############### AUTH0 ###############
# For Auth0 - from https://auth0.com/docs/quickstart/backend/python#create-the-jwt-validation-decorator

AUTH0_DOMAIN = current_app.AUTH0_DOMAIN
ALGORITHMS = current_app.ALGORITHMS
API_AUDIENCE = current_app.API_AUDIENCE

# Format error response and append status code
def get_token_auth_header():
	"""Obtains the Access Token from the Authorization Header
	"""
	auth = request.headers.get("Authorization", None)
	if not auth:
		raise AuthError({
				"code": "authorization_header_missing", 
				"description": "Authorization header is expected"
			}, 
			401
		)

	parts = auth.split()

	if parts[0].lower() != "bearer":
		raise AuthError({
				"code": "invalid_header", 
				"description": "Authorization header must start with" " Bearer"
			}, 
			401
		)
	elif len(parts) == 1:
		raise AuthError({
				"code": "invalid_header", 
				"description": "Token not found"
			}, 
			401
		)
	elif len(parts) > 2:
		raise AuthError({
				"code": "invalid_header", 
				"description": "Authorization header must be" " Bearer token"
			}, 
			401
		)

	token = parts[1]
	return token

def requires_auth(f):

	"""Determines if the Access Token is valid
	"""
	@wraps(f)
	def decorated(*args, **kwargs):
		token = get_token_auth_header()
		jsonurl = urlopen("https://" + AUTH0_DOMAIN + "/.well-known/jwks.json")
		jwks = json.loads(jsonurl.read())
		unverified_header = jwt.get_unverified_header(token)
		rsa_key = {}
		for key in jwks["keys"]:
			if key["kid"] == unverified_header["kid"]:
				rsa_key = {
					"kty": key["kty"],
					"kid": key["kid"],
					"use": key["use"],
					"n": key["n"],
					"e": key["e"]
				}
		if rsa_key:
				try:
					payload = jwt.decode(
						token,
						rsa_key,
						algorithms=ALGORITHMS,
						audience=API_AUDIENCE,
						issuer="https://"+AUTH0_DOMAIN+"/"
					)
				except jwt.ExpiredSignatureError:
					raise AuthError({
						"code": "token_expired", 
						"description": "token is expired"
					}, 401)
				except jwt.JWTClaimsError:
					raise AuthError({
						"code": "invalid_claims", 
						"description": "incorrect claims," 
						"please check the audience and issuer"
					}, 401)
				except Exception:
					raise AuthError({
						"code": "invalid_header", 
						"description": "Unable to parse authentication" 
						" token."
					}, 401)

				_request_ctx_stack.top.current_user = payload

				auth_id = request.args.get('auth_id')
				return f(auth_id, *args, **kwargs)
		raise AuthError({"code": "invalid_header", "description": "Unable to find appropriate key"}, 401)

	return decorated

def requires_scope(required_scope):
	"""Determines if the required scope is present in the Access Token
	Args:
			required_scope (str): The scope required to access the resource
	"""
	token = get_token_auth_header()
	unverified_claims = jwt.get_unverified_claims(token)
	if unverified_claims.get("scope"):
		token_scopes = unverified_claims["scope"].split()

		for token_scope in token_scopes:
			if token_scope == required_scope:
				return True

	return False