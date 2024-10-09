TV Show API

This API provides a backend for a TV show application. It allows users to manage shows, actors, users, and reviews through a RESTful interface.

Features:

CRUD Operations for Shows: Create, read, update, and delete show information.
CRUD Operations for Actors: Manage actors associated with shows, including their roles.
CRUD Operations for Users: Create and retrieve user information. (Reviews not currently implemented)
Show Reviews: Create and retrieve reviews associated with shows. (User association not currently implemented)
API Endpoints:

Endpoint	Method	Description	Status Codes
/shows	GET	Retrieves a list of all shows.	200 OK
/shows	POST	Creates a new show.	201 Created
/shows/<int:id>	GET	Retrieves information for a specific show by ID.	200 OK, 404 Not Found
/shows/<int:id>	PUT	Updates information for a specific show by ID.	200 OK, 404 Not Found
/shows/<int:id>	DELETE	Deletes a specific show by ID.	200 OK, 404 Not Found
/actors	GET	Retrieves a list of all actors.	200 OK
/actors	POST	Creates a new actor associated with a show (including their role).	201 Created
/actors/<int:id>	(Not Implemented)	(Future endpoint for retrieving/updating specific actors)	-
/users	GET	Retrieves a list of all users.	200 OK
/users	POST	Creates a new user.	201 Created
/users/<int:id>	(Not Implemented)	(Future endpoint for retrieving/updating specific users)	-
/reviews	GET	Retrieves a list of all reviews (associated shows not yet implemented).	200 OK
/reviews	POST	Creates a new review for a show (user association not yet implemented).	201 Created
/reviews/<int:id>	(Not Implemented)	(Future endpoint for retrieving/updating specific reviews)	-
/shows_actors/<int:show_id>/<int:actor_id>	GET	Retrieves the role of an actor associated with a specific show by ID.	200 OK, 404 Not Found
/shows_actors/<int:show_id>/<int:actor_id>	PUT	Updates the role of an actor associated with a specific show by ID.	200 OK, 404 Not Found

Export to Sheets
Technology Stack:

Flask: Python web framework
Flask-RESTful: Extension for building RESTful APIs in Flask
Flask-SQLAlchemy: SQLAlchemy integration for Flask
Flask-Migrate: Database migration management
SQLAlchemy: Object relational mapper for databases
SQLite (default): Lightweight database (consider a production-grade database for deployment)
Running the API:

Install dependencies: pip install flask flask-restful flask-sqlalchemy flask-migrate sqlalchemy
Configure the database connection string in app.config['SQLALCHEMY_DATABASE_URI'] (modify if needed)
Run the API: python app.py

Example Usage

# Get all shows
curl http://127.0.0.1:5000/shows

# Create a new show
curl -X POST -H "Content-Type: application/json" -d '{"name": "Breaking Bad", "network": "AMC"}' http://127.0.0.1:5000/shows

# Get information for a specific show
curl http://127.0.0.1:5000/shows/1

# Update a show
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Breaking Bad: Remastered"}' http://127.0.0.1:5000/# p5-project
