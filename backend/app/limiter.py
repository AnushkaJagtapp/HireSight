"""Rate limiter configuration using slowapi."""
from slowapi import Limiter
from slowapi.util import get_remote_address

# Default rate limiter keyed by client remote address
limiter = Limiter(key_func=get_remote_address)
