from flask import Blueprint, request

from db import db
from models import Quote, Comment


quotes = Blueprint('quotes', __name__)

@quotes.route('/quotes')
def index():
    quotes = db.session.execute(db.select(Quote)).scalars()

    return [quote.to_dict() for quote in quotes]

@quotes.route('/quotes', methods=['POST'])
def create():
    data = request.get_json()

    quote = Quote(author=data['author'], text=data['text'])
    db.session.add(quote)
    db.session.commit()

    return quote.to_dict()

@quotes.route('/quotes/<id>')
def show(id):
    quote = db.session.execute(db.select(Quote).filter_by(id=id)).scalar_one()

    return quote.to_dict()

@quotes.route('/quotes/<id>/comments')
def comments(id):
    return show(id)['comments']

@quotes.route('/quotes/<id>/comments', methods=['POST'])
def create_comment(id):
    data = request.get_json()

    quote = db.session.execute(db.select(Quote).filter_by(id=id)).scalar_one()
    comment = Comment(text=data['text'], quote=quote)
    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()
