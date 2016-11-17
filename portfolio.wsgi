#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/portfolio/")

from portfolio import app as application
application.secret_key = 'let us keep this a secret'
