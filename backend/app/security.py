from authx import AuthX, AuthXConfig
from .config import settings

config = AuthXConfig()

config.JWT_SECRET_KEY = settings.JWT_SECRET_KEY
config.JWT_ACCESS_COOKIE_NAME = settings.JWT_ACCESS_COOKIE_NAME
config.JWT_TOKEN_LOCATION = ["headers"]
config.JWT_COOKIE_CSRF_PROTECT = settings.JWT_COOKIE_CSRF_PROTECT

security = AuthX(config=config)
