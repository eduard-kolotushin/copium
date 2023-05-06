from app.extensions import api
from .home_namespace import api as ns1
from .user_namespace import api as ns2
from .help_namespace import api as ns3
from .publication_namespace import api as ns4
from .login_namespace import api as ns5
from .logout_namespace import api as ns6
from .credentials_namespace import api as ns7

api.add_namespace(ns1, path='/home')
api.add_namespace(ns2, path='/user')
api.add_namespace(ns3, path='/help')
api.add_namespace(ns4, path='/publication')
api.add_namespace(ns5, path='/login')
api.add_namespace(ns6, path='/logout')
api.add_namespace(ns7, path='/credentials')
