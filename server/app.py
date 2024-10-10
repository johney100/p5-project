#!/usr/bin/env python3

from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import google.generativeai as genai
import os

os.environ["GOOGLE_GENERATIVEAI_API_KEY"] = "AIzaSyCBr3rKUNANxHMOo2yIpHrl0XqWJ_VyPss"
genai.configure(api_key=os.environ["GOOGLE_GENERATIVEAI_API_KEY"])

from models import db, Story, Author, User, Review, stories_authors

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)



class StoryList(Resource):
    def get(self):
        story = [story.to_dict() for story in Story.query.all()]
        return story, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        parser.add_argument('network')
        data = parser.parse_args()

        new_story = Story(
            name=data['name'],
            network=data.get('network')
        )

        db.session.add(new_story)
        db.session.commit()

        return new_story.to_dict(), 201

class StoryId(Resource):
    def get(self, id):
        story = Story.query.filter_by(id=id).first()
        if story:
            return story.to_dict(), 200
        else:
            return {'message': 'Story not found'}, 404

    def put(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        data = parser.parse_args()

        story = Story.query.filter_by(id=id).first()
        if story:
            if data.get('name'):
                story.name = data['name']
                db.session.commit()
            return story.to_dict(), 200
        else:
            return {'message': 'Story not found'}, 404

    def delete(self, id):
        story = Story.query.filter_by(id=id).first()
        if story:
            db.session.delete(story)
            db.session.commit()
            return {'message': 'Story deleted'}, 200
        else:
            return {'message': 'Story not found'}, 404

class ReviewList(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('score', required=True)
        parser.add_argument('comment', required=True)
        parser.add_argument('story_id', required=True)
        data = parser.parse_args()

        new_review = Review(
            score=data['score'],
            comment=data['comment'],
            story_id=data['story_id']
        )

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict(), 201

class UserList(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('location', required=True)
        data = parser.parse_args()

        new_user = User(
            username=data['username'],
            location=data['location']
        )

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(), 201

class AuthorList(Resource):
    def get(self):
        authors = [author.to_dict() for author in Author.query.all()]
        return authors, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', required=True)
        parser.add_argument('age')
        parser.add_argument('show_id', required=True)
        parser.add_argument('role')
        data = parser.parse_args()

        new_author = Author(
            name=data['name'],
            age=data.get('age'),
            show_id=data['show_id']
        )

        db.session.add(new_author)
        db.session.commit()

        # Associate actor with show using relationship
        new_author.stories.append(Author.query.get(data['story_id']))  # Assuming Show model exists

        # No need for separate association insert
        db.session.commit()

        return new_author.to_dict(), 201

class StoryAuthorRelationship(Resource):
    def get(self, story_id, author_id):
        story_author = db.session.query(stories_authors).filter_by(story_id=story_id, author_id=author_id).first()
        if story_author:
            return {'role': story_author.role}, 200
        else:
            return {'message': 'Story-author relationship not found'}, 404

    def put(self, story_id, author_id):
        parser = reqparse.RequestParser()
        parser.add_argument('role')
        data = parser.parse_args()

        story_author = db.session.query(stories_authors).filter_by(story_id=story_id, author_id=author_id).first()

        if story_author:
            story_author.role = data.get('role')
            db.session.commit()
            return {'message': 'Role updated successfully'}, 200
        else:
            return {'message': 'Story-author relationship not found'}, 404





# ... Register routes (assuming `api` is an instance of Api):

api.add_resource(AuthorList, '/authors')
api.add_resource(StoryAuthorRelationship, '/stories_authors/<int:story_id>/<int:author_id>')

# ... Register routes (assuming `api` is an instance of Api):

api.add_resource(ReviewList, '/reviews')
api.add_resource(UserList, '/users')

# ... Register routes (assuming `api` is an instance of Api):

api.add_resource(StoryList, '/stories')
api.add_resource(StoryId, '/stories/<int:id>')