import node_mod
import os
from google.appengine.ext.webapp import template
import cgi

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class Guestbook(webapp.RequestHandler):
    def post(self):
         self.response.out.write(node_mod.graph_coloring(eval(self.request.get('name'))))
        
application = webapp.WSGIApplication(
                                     [('/posted', Guestbook)],
                                     debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
                             
