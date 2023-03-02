from db import db


class Quote(db.Model):
    __tablename__ = 'quotes'

    id = db.mapped_column(db.Integer, primary_key=True)
    author = db.mapped_column(db.String(64))
    text = db.mapped_column(db.String)

    comments = db.relationship('Comment', back_populates='quote')

    def to_dict(self):
        return {
            'id': self.id,
            'author': self.author,
            'text': self.text,
            'comments': [comment.to_dict() for comment in self.comments]
        }
