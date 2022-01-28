from django.http import HttpResponse
from django.shortcuts import render
from neo4j import GraphDatabase
import json

# Aura queries use an encrypted connection using the "neo4j+s" URI scheme
uri = "bolt://neo4j:7687"
user = "neo4j"
password = "streams"


def get_movie_from_response(response):
    movie = {'id': response['id']}
    needed_keys = {'title': 'title', 'large_teaser_image_ref': 'smallImageRef', 'large_image_ref': 'largeImageRef'}
    for key in needed_keys:
        if key in response.keys():
            movie[needed_keys[key]] = response[key]
    movie['nodes'] = []
    movie['links'] = []
    return movie


def get_node_from_response(response, node_type_id):
    node = {'id': response.id}
    if 'name' in response.keys():
        node['title'] = response['name']
    if 'title' in response.keys():
        node['title'] = response['title']
    node_type = ''
    if node_type_id == 0:
        node_type = "WATCHED"
    if node_type_id == 1:
        node_type = "LINK"
    if node_type_id == 2:
        node_type = "RECOMMENDATION"
    node['type'] = node_type
    return node


def get_link_from_response(response):
    rel = {'sourceId': response.nodes[0].id, 'targetId': response.nodes[1].id, 'type': response.type}
    return rel


def get_recommendation_from_response(response):
    watched_movies = []

    for movie in response:
        w_m = movie
        watched_movies.append(get_movie_from_response(w_m[4]))

        index = len(watched_movies) - 1
        for i in range(0, 3):
            node = get_node_from_response(w_m[i * 2], i)
            if node not in watched_movies[index]['nodes']:
                watched_movies[index]['nodes'].append(node)

        for i in range(0, 2):
            node = get_link_from_response(w_m[i * 2 + 1])
            if node not in watched_movies[index]['links']:
                watched_movies[index]['links'].append(node)
    return watched_movies


# Create your views here.
def django_recommendation(username):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session()
    result = list(session.run('MATCH (u:User)-[:hasWatched]->(m:Movie)-[r]-(t)-[r2]-(m2:Movie) '
                              'WHERE u.username = "' + username.path.split('/')[-1] + '" AND m.id <> m2.id '
                                                                                  'RETURN m, r, t, r2, m2 LIMIT 10'))
    session.close()
    driver.close()
    return HttpResponse(json.dumps(get_recommendation_from_response(result)), content_type="application/json")
