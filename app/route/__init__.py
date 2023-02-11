from app.extensions import api
from .home_namespace import api as ns1
from .user_namespace import api as ns2
from .help_namespace import api as ns3
from .publication_namespace import api as ns4

api.add_namespace(ns1, path='/home')
api.add_namespace(ns2, path='/user')
api.add_namespace(ns3, path='/help')
api.add_namespace(ns4, path='/publication')