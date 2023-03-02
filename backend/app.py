from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from config import Config
from db import db

from controllers import quotes
from models import Quote, Comment


app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
cors = CORS(app, resources={r'*': {'origins': '*'}})
migrate = Migrate(app, db)

app.register_blueprint(quotes)

# shell context
@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Quote=Quote, Comment=Comment)
