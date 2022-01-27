from django.db import models

# Create your models here.
from rest_framework.utils import json
from neo4j import GraphDatabase


def get_data():
    with open("./all_links_kinopoisk7.txt", "r") as read_file:
        data = json.load(read_file)
    new_data = data[:100]
    return new_data


def delete_space(string):
    return string.replace(' ', '_')


def create_dictionary_for_movie(movie):
    needed_tags = ['ID', 'Link', 'Name', 'Время', 'Rating', 'Count_votes', 'background_image_link_1x',
                   'background_image_link_2x',
                   'title_image_link_1x', 'title_image_link_2x']
    needed_tags_array_1 = ['Год производства', 'Возраст']
    needed_tags_rename = {}
    needed_tags_rename["ID"] = "kinopoisk_id"
    needed_tags_rename["Name"] = "title"
    needed_tags_rename["Время"] = 'duration'
    needed_tags_rename["Год_производства"] = "release_year"
    needed_tags_rename["Возраст"] = "min_age"
    needed_tags_rename["Rating"] = "rating"
    needed_tags_rename["Count_votes"] = "voice_count"
    needed_tags_rename["Link"] = "kinopoisk_ref"
    needed_tags_rename["background_image_link_1x"] = "small_image_ref"
    needed_tags_rename["background_image_link_2x"] = "large_image_ref"
    needed_tags_rename["title_image_link_1x"] = "small_teaser_image_ref"
    needed_tags_rename["title_image_link_2x"] = "large_teaser_image_ref"

    new_dict = {}
    for key in movie:
        if key in needed_tags:
            if key in needed_tags_rename:
                if not ((key == 'Время') and (movie[key] == '—')):
                    new_dict[delete_space(needed_tags_rename[key])] = movie[key]
            else:
                new_dict[delete_space(key)] = movie[key]
        if key in needed_tags_array_1:
            new_dict[needed_tags_rename[delete_space(key)]] = movie[key][0]
    return new_dict


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


def get_country(country):
    return ''.join(country.replace(' ', '_').replace(')', '_').replace('(', '_').split('_'))


def get_int(string):
    res = ''
    for char in string:
        if char.isdigit():
            res += char
    return res


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


def fill_database():
    uri = "neo4j+s://4ba8049f.databases.neo4j.io"
    user = "neo4j"
    password = "54aOHjUP3XxccKn6pA650bdgEkKUakWIIs9ejWc_xl4"

    new_data = get_data()

    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session()
    session.run(create_movie_order(new_data) + create_genres_order(new_data) + create_persons_order(new_data) +
                create_country_order(new_data) + create_movie_genre_ref(new_data) +
                create_movie_person_ref(new_data) + create_movie_country_ref(new_data))
    session.close()
    driver.close()


def is_fill_needed():
    uri = "neo4j+s://4ba8049f.databases.neo4j.io"
    user = "neo4j"
    password = "54aOHjUP3XxccKn6pA650bdgEkKUakWIIs9ejWc_xl4"
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session()
    response = list(session.run("MATCH (m:Movie) RETURN count(m) as count"))
    session.close()
    driver.close()
    if response[0]['count'] < 100:
        fill_database()