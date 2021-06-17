# Import all dependencies that might be required
#from flask import Flask, render_template, redirect
# from flask_pymongo import PyMongo

import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify
from sqlalchemy import create_engine

from flask import Flask, jsonify

#from flask_cors import CORS, cross_origin

from flask import Flask, render_template
import pymongo

###############
# Flask Setup #
###############
app = Flask(__name__)

####################
# Database Connect #
####################
# Use PyMongo to establish Mongo connection
# Create connection variable
conn = "mongodb+srv://pureblonde:pureblonde@ufo.ejax2.mongodb.net/test"

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
UFO = client.UFO

################
# Flask Routes #
################

# Set route to render homepage 
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

# Set route to render Callum
@app.route("/pie")
def pie():
    """Return the homepage."""
    return render_template("index_c.html")

# Set route to render Nick
@app.route("/map", methods=["GET"])
def map():
    """Return the homepage."""
    return render_template("index_n.html")    

# Set route to call Json data from MongoDB ufosightings
@app.route("/ufosightings", methods=["GET"])
def welcome():

    """List all available api routes."""
   
    UFO_collection = UFO.UFOCLEAN

    output = []
    for q in UFO_collection.find():
        output.append({'city' : q['city'],
        'state' : q['state'],
        'year' : q['year'],
        'date_time' : q['date_time'],
        'shape' : q['shape'],
        'duration' : q['duration'],
        'stats' : q['stats'],
        'report_link' : q['report_link'],
        'text' : q['text'],
        'posted' : q['posted'],
        'city_latitude' : q['city_latitude'],
        'city_longitude' : q['city_longitude']

        # 'date' : q['date'],
        # 'time' : q['time']
        
        })
    return jsonify({'result' : output})

# Set route to call Json data from MongoDB ufo-refined-1
@app.route("/uforefined", methods=["GET"])
def mapd3():

    """List all available api routes."""
   
    UFO_collection = UFO.ufrefined

    output = []
    for q in UFO_collection.find():
        output.append({
        'date_time' : q['datetime'],
        'city' : q['city'],
        'state' : q['state'],
        'country': q['country'],
        'duration (seconds)' : q['duration (seconds)'],
        'duration (hours/min)': q['duration (hours/min)'],
        'comments' : q['comments'],
        'date posted' : q['date posted'],
        'latitude' : q['latitude'],
        'longitude' : q['longitude']        
        })
    return jsonify({'result' : output})

if __name__ == "__main__":
    app.run(debug=True)
