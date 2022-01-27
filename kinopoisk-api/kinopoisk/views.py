from django.http import HttpResponse
from django.shortcuts import render
from neo4j import GraphDatabase
import json

# Aura queries use an encrypted connection using the "neo4j+s" URI scheme
uri = "neo4j+s://4ba8049f.databases.neo4j.io"
user = "neo4j"
password = "54aOHjUP3XxccKn6pA650bdgEkKUakWIIs9ejWc_xl4"

# Create your views here.
def django_recommendation(id):
    movie = parse_page(id)
    return HttpResponse(json.dumps(movie), content_type="application/json")
