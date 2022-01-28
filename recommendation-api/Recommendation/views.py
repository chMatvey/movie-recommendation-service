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


def get_watched_movies_from_response(response):
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


masta = {}


def get_len(key):
    print(masta)
    return len(masta[key]['nodes'])


def get_recommendation_from_response(response):
    watched_movies = get_watched_movies_from_response(response)
    index = 0
    masta = {}
    for index in range(len(watched_movies)):
        if watched_movies[index]['title'] not in masta.keys():
            masta[watched_movies[index]['title']] = watched_movies[index]
        else:
            has_Link = False
            has_Watch = False
            rec_node = watched_movies[index]['nodes'][0]
            link_node = watched_movies[index]['nodes'][1]
            watch_node = watched_movies[index]['nodes'][2]
            links_Link_to_Rec = watched_movies[index]['links'][0]
            links_Link_to_Watch = watched_movies[index]['links'][1]

            tit = watched_movies[index]['title']
            for ex_node in masta[tit]['nodes']:
                if link_node == ex_node:
                    has_Link = True
                if watch_node == ex_node:
                    has_Watch = True
            if not has_Link:
                masta[tit]['nodes'].append(link_node)
                masta[tit]['links'].append(links_Link_to_Rec)
            if not has_Watch:
                print(2)
                masta[tit]['nodes'].append(watch_node)
                masta[tit]['links'].append(links_Link_to_Watch)

    masta_values = {}
    for key in masta:
        masta_values[key] = len(masta[key]['nodes'])
    masta_values = {k: masta_values[k] for k in sorted(masta_values, key=masta_values.get, reverse=True)}

    movies = []
    index = 0
    for key in masta_values:
        movies.append(masta[key])
        index += 1
        if index >= 10:
            break
    return movies


# Create your views here.
def django_recommendation(username):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session()
    result = list(session.run('MATCH (u:User)-[:hasWatched]->(m:Movie)-[r]-(t)-[r2]-(m2:Movie) '
                              'WHERE u.username = "' + username.path.split('/')[-1] + '" AND m.id <> m2.id '
                                                                                  'RETURN m, r, t, r2, m2 LIMIT 10'))
                              'WHERE u.username = "' + username.path.split('/')[-1] + '" AND m.id <> m2.id '
                                                                                      'RETURN m, r, t, r2, m2'))
    session.close()
    driver.close()
    return HttpResponse(json.dumps(get_recommendation_from_response(result)), content_type="application/json")
