
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

stories_authors = db.Table(
    'stories_authors',
    metadata,
    db.Column('story_id', db.Integer, db.ForeignKey('stories.id'), primary_key=True),
    db.Column('author', db.Integer, db.ForeignKey('authors.id'), primary_key=True),
    db.Column('role', db.String, unique=False)  # Add a new column for the role attribute
)


class Story(db.Model, SerializerMixin):
    __tablename__ = 'stories'  # Use plural form for consistency

    serialize_rules = ('-comments', '-authors')  # Only exclude if using serialization

    title = db.Column(db.String, unique=False)
    body = db.Column(db.String, unique=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    id = db.Column(db.Integer, primary_key=True)

    # Relationship mapping the story to related reviews
    comments = db.relationship(
        'Comment', back_populates="story", cascade='all, delete-orphan')

    # Relationship mapping the story to related actors
    authors = db.relationship(
        'Author', secondary=stories_authors, back_populates='stories')

    def __repr__(self):
        # Assuming you want to represent by title, change if needed
        return f'<Story {self.title}>'


class Author(db.Model, SerializerMixin):
    __tablename__ = 'authors'

    serialize_rules = ('-stories',)  # Only exclude if using serialization

    name = db.Column(db.String)
    age = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    id = db.Column(db.Integer, primary_key=True)
    
    
    # Relationship mapping the actor to related stories
    stories = db.relationship(
        'Story', secondary=stories_authors, back_populates='authors')

    def __repr__(self):
        return f'<Author {self.name}>'


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    # serialize_rules = ('-shows',)  # Remove if not using serialization

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    story_id = db.Column(db.Integer, db.ForeignKey('stories.id'))

    # Relationship mapping the review to related story
    story = db.relationship('Story', back_populates="comments")

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates="comments")

    def __repr__(self):
        return f'<Comment ({self.id}) of {self.comment}: {self.rating}/10>'
    
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    #serialize_rules = ('-reviews.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    location = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    comments = db.relationship('Comment', back_populates="user")
 


### USE breakpoint - similar to ipdb - external lib
## print method + repr
## add styling - tailwind is popular
## review association 