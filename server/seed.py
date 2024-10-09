#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Show, Actor, User, Review, shows_actors

fake = Faker()



scores = [s+1 for s in range(4)]



def make_reviews():

    Review.query.delete()
    
    reviews = [
        Review(
            comment=fake.sentence(),
            score=randint(1, 4),
            show_id=randint(1, 10),
            user_id=randint(1, 10),
        )
        for _ in range(20)
    ]
    
    db.session.add_all(reviews)
    db.session.commit()    

def make_actors():

    Actor.query.delete()
    
    actors = [
        Actor(
            name=f"{fake.first_name()} {fake.last_name()}",
            age=randint(18, 85),
            show_id=randint(1, 10),
        )
        for _ in range(25)
    ]


    db.session.add_all(actors)
    db.session.commit()    

def make_users():

    User.query.delete()
    
    users = [
        User(
            username=fake.user_name(),
            location=fake.city()
        )
        for _ in range(15)
    ]

    db.session.add_all(users)
    db.session.commit()  

def make_shows():

    Show.query.delete()
    
    shows = [
        Show(
            name=fake.catch_phrase(),
            network=f"{fake.word().upper()} TV"
        )
        for _ in range(10)
    ]

    db.session.add_all(shows)
    db.session.commit()  

def actor_to_show():
    
    db.session.query(shows_actors).delete()

    shows = Show.query.all()  # Get all existing shows

    for _ in range(10):
        random_actor = rc(Actor.query.all())

        # Choose a random show from existing ones
        random_show = rc(shows)
        random_show.actors.append(random_actor)

        db.session.add(random_show)  # Add the modified show

    db.session.commit()

if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")
        make_reviews()
        make_actors()
        make_users()
        make_shows()
        actor_to_show()