#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Story, Author, User, Review, stories_authors

fake = Faker()



scores = [s+1 for s in range(4)]



def make_reviews():

    Review.query.delete()
    
    reviews = [
        Review(
            comment=fake.sentence(),
            score=randint(1, 4),
            story_id=randint(1, 10),
            user_id=randint(1, 10),
        )
        for _ in range(20)
    ]
    
    db.session.add_all(reviews)
    db.session.commit()    

def make_authors():

    Author.query.delete()
    
    authors = [
        Author(
            name=f"{fake.first_name()} {fake.last_name()}",
            age=randint(18, 85)
            
        )
        for _ in range(25)
    ]


    db.session.add_all(authors)
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

def make_stories():

    Story.query.delete()
    
    stories = [
        Story(
            title=fake.catch_phrase(),
            body=fake.paragraph()
        )
        for _ in range(10)
    ]

    db.session.add_all(stories)
    db.session.commit()  

def author_to_story():
    
    db.session.query(stories_authors).delete()

    stories = Story.query.all()  # Get all existing shows

    for _ in range(10):
        random_author = rc(Author.query.all())

        # Choose a random show from existing ones
        random_story = rc(stories)
        random_story.authors.append(random_author)

        db.session.add(random_story)  # Add the modified show

    db.session.commit()

if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")
        make_reviews()
        make_authors()
        make_users()
        make_stories()
        author_to_story()