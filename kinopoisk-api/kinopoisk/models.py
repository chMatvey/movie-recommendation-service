import time
from django.db import models

# Create your models here.
from rest_framework.utils import json
from neo4j import GraphDatabase
from .neo4j_add_movie import smart_create_persons_order, smart_create_movie_order, smart_create_country_order, \
    smart_create_genres_order, create_dictionary_for_movie, get_country, get_int, delete_space

uri = "bolt://neo4j:7687"
user = "neo4j"
password = "streams"


def get_data():
    with open("./all_links_kinopoisk7.txt", "r") as read_file:
        data = json.load(read_file)
    new_data = data[:100]
    return new_data


def create_persons_order(data):
    persons = {}
    for i in range(len(data)):
        for person in data[i]['Состав команды']:
            if person['Тип_Персонала'] in ['actor', 'director', 'writer', 'producer']:
                persons[person['ID']] = person['Имя']
    i = 0
    all_queue = ''
    for person in persons:
        n_dict = {}
        n_dict['name'] = persons[person]
        n_dict['kinopoisk_id'] = person

        query = 'CREATE (person' + n_dict['kinopoisk_id'] + ':Person { '
        query += 'name: "' + str(n_dict['name']) + '", '
        query += 'kinopoisk_id: ' + str(person) + ', '
        i += 1
        query += 'id:' + str(i) + '}) '
        all_queue += query
    all_persons_creating = all_queue
    return all_persons_creating


def create_genres_order(new_data):
    genres = {}
    for i in range(len(new_data)):
        for genre in new_data[i]['Жанр']:
            genres[genre['Жанр(eng)'].replace('-', '_')] = genre['Жанр(rus)']
    i = 0
    all_queue = ''
    for genre in genres:
        n_dict = {}
        n_dict['name'] = genres[genre]
        n_dict['Kinopoisk_Genre_ID'] = genre

        query = 'CREATE (' + n_dict['Kinopoisk_Genre_ID'] + ':Genre { '
        query += 'name: "' + str(genres[genre]) + '", '
        i += 1
        query += 'id:' + str(i) + '}) '
        all_queue += query
    all_genres_creating = all_queue
    return all_genres_creating


def create_country_order(new_data):
    countries = {}
    for i in range(len(new_data)):
        for country in new_data[i]['Страна']:
            if country != '—':
                countries[get_country(country)] = 1
    i = 0
    all_queue = ''
    for country in countries:
        n_dict = {}
        n_dict['name'] = country

        query = 'CREATE (' + n_dict['name'] + ':Country { '
        for row in n_dict:
            query += row + ': "' + str(n_dict[row]) + '", '
        i += 1
        query += 'id:' + str(i) + '}) '
        all_queue += query
    all_counries_creating = all_queue
    return all_counries_creating


def create_movie_order(new_data):
    m_dict = {'kinopoisk_id': 'int', 'kinopoisk_ref': 'str', 'title': 'str', 'release_year': 'int', 'min_age': 'int',
              'duration': 'int', 'rating': 'flt', 'voice_count': 'int', 'small_teaser_image_ref': 'str',
              'large_teaser_image_ref': 'str', 'small_image_ref': 'str', 'large_image_ref': 'str'}

    i = 0
    all_movies_creating = ''
    for movie in new_data:
        n_dict = create_dictionary_for_movie(movie)
        query = 'CREATE (movie' + n_dict['kinopoisk_id'] + ':Movie { '
        for row in n_dict:
            if m_dict[row] == 'str':
                query += row + ': "' + n_dict[row] + '", '
            elif m_dict[row] == 'int':
                query += row + ': ' + get_int(str(n_dict[row])) + ', '
            elif m_dict[row] == 'flt':
                query += row + ': ' + str(n_dict[row]) + ', '

        i += 1
        query += 'id:' + str(i) + '}) '
        all_movies_creating += query
    return all_movies_creating


def create_movie_genre_ref(new_data):
    queue = 'CREATE '
    for movie in new_data:
        for genre in movie['Жанр']:
            queue += '(movie' + movie['ID'] + ')-[:hasGenre]->(' + genre['Жанр(eng)'].replace('-', '_') + '), '
    adding_genres = queue[:-2] + ' '
    return adding_genres


def create_movie_person_ref(new_data):
    queue = 'CREATE '
    for movie in new_data:
        order = 0
        for person in movie['Состав команды']:
            try:
                if person['Тип_Персонала'] == 'actor':
                    order += 1
                    queue += '(movie' + movie['ID'] + ')-[:hasCast {cast_type:\'' + person[
                        'Тип_Персонала'] + '\', order:' + str(order) + ', role:\'' + person['Роль_в_фильме'].replace(
                        '\'', '') + '\'}]->(person' + person['ID'] + '), '
                elif person['Тип_Персонала'] in ['director', 'writer', 'producer']:
                    queue += '(movie' + movie['ID'] + ')-[:hasCast {cast_type:\'' + person[
                        'Тип_Персонала'] + '\'}]->(person' + person['ID'] + '), '
            except:
                pass
    adding_persons = queue[:-2] + ' '
    return adding_persons


def create_movie_country_ref(new_data):
    queue = 'CREATE '
    for movie in new_data:
        if movie['Страна'][0] != '—':
            queue += '(movie' + movie['ID'] + ')-[:hasCountry]->(' + get_country(movie['Страна'][0]) + '), '
    adding_counries = queue[:-2] + ' '
    return adding_counries


def fill_database(new_data):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session()
    session.run(create_movie_order(new_data) + create_genres_order(new_data) + create_persons_order(new_data) +
                create_country_order(new_data) + create_movie_genre_ref(new_data) +
                create_movie_person_ref(new_data) + create_movie_country_ref(new_data))
    session.close()
    driver.close()


def add_to_database(new_data):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session()
    match_queue = ''
    add_movies = smart_create_movie_order(new_data)
    add_genres, match_queue = smart_create_genres_order(new_data, match_queue)
    add_persons, match_queue = smart_create_persons_order(new_data, match_queue)
    add_country, match_queue = smart_create_country_order(new_data, match_queue)
    session.run(match_queue + add_movies + add_genres + add_persons +
                add_country + create_movie_genre_ref(new_data) +
                create_movie_person_ref(new_data) + create_movie_country_ref(new_data))
    session.close()
    driver.close()


def is_fill_needed():
    time.sleep(20)
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session()
    response = list(session.run("MATCH (m:Movie) RETURN count(m) as count"))
    session.close()
    driver.close()
    if response[0]['count'] < 100:
        fill_database(get_data())


def find(kinopoisk_id):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session()
    response = list(session.run("MATCH (m:Movie) WHERE m.kinopoisk_id = " + str(kinopoisk_id) + " RETURN count(m) as "
                                                                                                "count"))
    session.close()
    driver.close()
    return response[0]['count']
