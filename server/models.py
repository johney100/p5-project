
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

shows_actors = db.Table(
    'shows_actors',
    metadata,
    db.Column('show_id', db.Integer, db.ForeignKey('shows.id'), primary_key=True),
    db.Column('actor_id', db.Integer, db.ForeignKey('actors.id'), primary_key=True),
    db.Column('role', db.String, unique=False)  # Add a new column for the role attribute
)


class Show(db.Model, SerializerMixin):
    __tablename__ = 'shows'

    serialize_rules = ('-reviews','-actors')
    
    name = db.Column(db.String, unique=False)
    network = db.Column(db.String, unique=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    id = db.Column(db.Integer, primary_key=True)

    # Relationship mapping the show to related reviews
    reviews = db.relationship(
        'Review', back_populates="show", cascade='all, delete-orphan')


    # Relationship mapping the show to related actors
    actors = db.relationship(
        'Actor', secondary=shows_actors, back_populates='shows')
   
    def __repr__(self):
        return f'<Show {self.name} Network: {self.network}>'
    

class Actor(db.Model, SerializerMixin):
    __tablename__ = 'actors'

    serialize_rules = ('-shows',)

    name = db.Column(db.String)
    age = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    id = db.Column(db.Integer, primary_key=True)

    # Relationship mapping the meeting to related employees
    shows = db.relationship(
        'Show', secondary=shows_actors, back_populates='actors')
    
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'))
   
    def __repr__(self):
        return f'<Actor {self.name}>'
    

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    #serialize_rules = ( '-shows',)
    
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer)
    comment = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'))
    
    # Relationship mapping the review to related show
    show = db.relationship('Show', back_populates="reviews")

   # user = db.relationship('User', back_populates="reviews")

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'<Review ({self.id}) of {self.comment}: {self.score}/10>'
    
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    #serialize_rules = ('-reviews.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    location = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #reviews = db.relationship('Review', backref='user')
    #review = db.relationship('Review', back_populates="users")


### USE breakpoint - similar to ipdb - external lib
## print method + repr
## add styling - tailwind is popular
## review association 