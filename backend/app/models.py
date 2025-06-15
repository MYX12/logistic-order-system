from app import db
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

#db=SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    email  = db.Column(db.String(128),unique=True,nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(64),default = 'customer')
    created_at = db.Column(db.DateTime,default=datetime.utcnow)


class Order(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    item  = db.Column(db.String(128),unique=True,nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.utcnow)

    user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    user = db.relationship('User',backref=db.backref('orders',lazy=True))