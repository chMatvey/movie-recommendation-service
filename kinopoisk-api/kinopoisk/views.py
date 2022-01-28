from django.http import HttpResponse
from .add_movie import get_movie_rating, parse_page
from .models import find, fill_database
from django.shortcuts import render
from neo4j import GraphDatabase
import json

# Aura queries use an encrypted connection using the "neo4j+s" URI scheme
uri = "bolt://neo4j:7687"
user = "neo4j"
password = "streams"


# Create your views here.
def django_recommendation(id):
    movie_id = int(id.path.split('/')[-1])
    if find(movie_id) == 0:
        movie = parse_page('https://www.kinopoisk.ru/film/' + str(movie_id) + '/')
        fill_database([movie])
        return HttpResponse(json.dumps(movie), content_type="application/json")
    else:
        return HttpResponse(json.dumps('None changed'), content_type="application/json")

