from db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.mapped_column(db.Integer, primary_key=True)
    text = db.mapped_column(db.String)
    quote_id = db.mapped_column(db.ForeignKey('quotes.id'))

    quote = db.relationship('Quote', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'quote': self.quote.id
        }
