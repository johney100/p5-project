#!/usr/bin/env python3

'''

from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate


from models import db, Show, Actor, User, Review, shows_actors

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

api = Api(app)

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)



@app.route('/shows', methods=["GET", "POST"])
def shows():
    if request.method == "GET":
        shows = [show.to_dict() for show in Show.query.all()]
        return  make_response(jsonify(shows),   200  )
    
    elif request.method == "POST":
        data = request.get_json()
        new_show = Show(
            name=data.get('name'),
            network=data.get('network')
        )

        db.session.add(new_show)
        db.session.commit()

        new_show_dict = new_show.to_dict()

        return  make_response(jsonify(new_show_dict), 201)
    
    
@app.route('/shows/<int:id>', methods = ["GET", "PUT", "DELETE"])
def shows_by_id(id):
    show = Show.query.filter_by(id=id).first()

    if request.method == 'GET':
        show_by_id = show.to_dict()
        return make_response ( jsonify(show_by_id), 200  )
    
    elif request.method == 'PUT':
        data = request.get_json()
        if data.get('name'):
            show.name = data.get('name')
            db.session.commit()
            show_dict = show.to_dict()
            return make_response(jsonify(show_dict), 200)
        
    elif request.method =="DELETE":
        db.session.delete(show)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "Show deleted."
        }

        response = make_response(
            response_body,
            200
        )

        return response

@app.route('/reviews', methods=["GET", "POST"])
def reviews():
    if request.method == "GET":
        reviews = [review.to_dict() for review in Review.query.all()]
        return  make_response(jsonify(reviews),   200  )
    
    elif request.method == "POST":
        data = request.get_json()
        show_id = data.get('show_id')
        new_review = Review(
            score=data.get('score'),
            comment=data.get('comment'),
            show_id=show_id
        )

        db.session.add(new_review)
        db.session.commit()

        new_review_dict = new_review.to_dict()

        return  make_response(jsonify(new_review_dict), 201)

@app.route('/users', methods=["GET", "POST"])
def users():
    if request.method == "GET":
        users = [user.to_dict() for user in User.query.all()]
        return  make_response(jsonify(users),   200  )
    
    elif request.method == "POST":
        data = request.get_json()
        new_user = User(
            username=data.get('username'),
            location=data.get('location')
           
        )

        db.session.add(new_user)
        db.session.commit()

        new_user_dict = new_user.to_dict()

        return  make_response(jsonify(new_user_dict), 201)
    
    
@app.route('/actors', methods=["GET", "POST"])
def actors():
    if request.method == "GET":
        actors = [actor.to_dict() for actor in Actor.query.all()]
        return  make_response(jsonify(actors),   200  )
    
    elif request.method == "POST":
        data = request.get_json()
        show_id = data.get('show_id')
        
        new_actor = Actor(
            name=data.get('name'),
            age=data.get('age'),
            show_id=show_id
           
        )


        db.session.add(new_actor)
        db.session.commit()

       
        association = shows_actors.insert().values(show_id=show_id, actor_id=new_actor.id, role=data.get('role'))
        

        db.session.execute(association)
        db.session.commit()

        new_actor_dict = new_actor.to_dict()

        return  make_response(jsonify(new_actor_dict), 201)
    

    
@app.route('/shows_actors/<int:show_id>/<int:actor_id>', methods=['GET', 'POST'])
def update_show_actor_role(show_id, actor_id):
  if request.method == 'GET':
    show_actor = db.session.query(shows_actors).filter_by(show_id=show_id, actor_id=actor_id).first()
    if show_actor:
      return jsonify({'role': show_actor.role}), 200
    else:
      return jsonify({'message': 'Show-actor relationship not found'}), 404
  else:
    data = request.get_json()
    role = data.get('role')

    show_actor = db.session.query(shows_actors).filter_by(show_id=show_id, actor_id=actor_id).first()

    if show_actor:
      show_actor.role = role
      db.session.commit()
      return jsonify({'message': 'Role updated successfully'}), 200
    else:
      return jsonify({'message': 'Show-actor relationship not found'}), 404
'''
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from models import db, Show, Actor, User, Review, shows_actors

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)




class ShowList(Resource):
    def get(self):
        shows = [show.to_dict() for show in Show.query.all()]
        return shows, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        parser.add_argument('network')
        data = parser.parse_args()

        new_show = Show(
            name=data['name'],
            network=data.get('network')
        )

        db.session.add(new_show)
        db.session.commit()

        return new_show.to_dict(), 201

class ShowId(Resource):
    def get(self, id):
        show = Show.query.filter_by(id=id).first()
        if show:
            return show.to_dict(), 200
        else:
            return {'message': 'Show not found'}, 404

    def put(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        data = parser.parse_args()

        show = Show.query.filter_by(id=id).first()
        if show:
            if data.get('name'):
                show.name = data['name']
                db.session.commit()
            return show.to_dict(), 200
        else:
            return {'message': 'Show not found'}, 404

    def delete(self, id):
        show = Show.query.filter_by(id=id).first()
        if show:
            db.session.delete(show)
            db.session.commit()
            return {'message': 'Show deleted'}, 200
        else:
            return {'message': 'Show not found'}, 404

class ReviewList(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('score', required=True)
        parser.add_argument('comment', required=True)
        parser.add_argument('show_id', required=True)
        data = parser.parse_args()

        new_review = Review(
            score=data['score'],
            comment=data['comment'],
            show_id=data['show_id']
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

class ActorList(Resource):
    def get(self):
        actors = [actor.to_dict() for actor in Actor.query.all()]
        return actors, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', required=True)
        parser.add_argument('age')
        parser.add_argument('show_id', required=True)
        parser.add_argument('role')
        data = parser.parse_args()

        new_actor = Actor(
            name=data['name'],
            age=data.get('age'),
            show_id=data['show_id']
        )

        db.session.add(new_actor)
        db.session.commit()

        # Associate actor with show using relationship
        new_actor.shows.append(Show.query.get(data['show_id']))  # Assuming Show model exists

        # No need for separate association insert
        db.session.commit()

        return new_actor.to_dict(), 201

class ShowActorRelationship(Resource):
    def get(self, show_id, actor_id):
        show_actor = db.session.query(shows_actors).filter_by(show_id=show_id, actor_id=actor_id).first()
        if show_actor:
            return {'role': show_actor.role}, 200
        else:
            return {'message': 'Show-actor relationship not found'}, 404

    def put(self, show_id, actor_id):
        parser = reqparse.RequestParser()
        parser.add_argument('role')
        data = parser.parse_args()

        show_actor = db.session.query(shows_actors).filter_by(show_id=show_id, actor_id=actor_id).first()

        if show_actor:
            show_actor.role = data.get('role')
            db.session.commit()
            return {'message': 'Role updated successfully'}, 200
        else:
            return {'message': 'Show-actor relationship not found'}, 404





# ... Register routes (assuming `api` is an instance of Api):

api.add_resource(ActorList, '/actors')
api.add_resource(ShowActorRelationship, '/shows_actors/<int:show_id>/<int:actor_id>')

# ... Register routes (assuming `api` is an instance of Api):

api.add_resource(ReviewList, '/reviews')
api.add_resource(UserList, '/users')

# ... Register routes (assuming `api` is an instance of Api):

api.add_resource(ShowList, '/shows')
api.add_resource(ShowId, '/shows/<int:id>')